"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, getAuthUser, isAuthenticated } from "@/utils";

interface AuthContextType {
  authenticated: boolean;
  user: any | null;
  loading: boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = () => {
    setAuthenticated(isAuthenticated());
    setUser(getAuthUser());
    setLoading(false);
  };

  useEffect(() => {
    refreshAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "github_access_token" || e.key === "github_user") {
        refreshAuth();
      }
    };

    const handleAuthChange = () => {
      refreshAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, user, loading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
