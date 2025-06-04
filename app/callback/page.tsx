"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github, Loader2, AlertCircle } from "lucide-react";
import { setAuthData } from "@/utils";
import { GitHubUser } from "@/types/github";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const errorParam = searchParams.get("error");

        if (errorParam) {
          setError("Authorization was denied or cancelled");
          setLoading(false);
          return;
        }

        if (!code) {
          setError("No authorization code received");
          setLoading(false);
          return;
        }

        const tokenResponse = await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!tokenResponse.ok) {
          throw new Error("Failed to exchange code for token");
        }

        const { access_token } = await tokenResponse.json();

        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "User-Agent": "GitHub-Repositories-Explorer",
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user information");
        }

        const userData = await userResponse.json();
        setUser(userData);

        setAuthData(access_token, userData);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred during login",
        );
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <h2 className="text-xl font-semibold">Processing your login...</h2>
          <p className="text-muted-foreground">
            Please wait while we complete your authentication.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-red-600">Login Failed</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => router.push("/")} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Github className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-green-600">
              Login Successful!
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Welcome, {user.name || user.login}!
            </p>
            <p className="text-muted-foreground text-sm">
              You will be redirected to the home page shortly...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="space-y-4 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-muted-foreground">
              Please wait while we process your request.
            </p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
