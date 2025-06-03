"use client";

import { Github, LogIn, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { githubOAuthLogin, logout } from "@/utils";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { authenticated, user } = useAuth();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Github className="text-primary h-6 w-6" />
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold tracking-tight md:text-lg">
                GitHub Repositories Explorer
              </h1>
              <p className="text-muted-foreground hidden text-xs sm:block">
                Discover and explore GitHub users and their repositories
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {authenticated && user ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden text-sm sm:inline">
                  {user.name || user.login}
                </span>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={githubOAuthLogin}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login with GitHub</span>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
