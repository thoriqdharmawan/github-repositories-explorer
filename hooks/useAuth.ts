import { useEffect, useState } from "react";
import { getAuthUser, isAuthenticated } from "@/utils";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
      setUser(getAuthUser());
      setLoading(false);
    };

    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "github_access_token" || e.key === "github_user") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { authenticated, user, loading };
}
