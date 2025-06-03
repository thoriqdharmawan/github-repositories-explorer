"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/users";
import { Repo } from "@/types/repos";

interface DetailContextType {
  selectedUser: User | null;
  selectedRepo: Repo | null;
  setSelectedUser: (user: User | null) => void;
  setSelectedRepo: (repo: Repo | null) => void;
  closeAllDetails: () => void;
}

const DetailContext = createContext<DetailContextType | undefined>(undefined);

export const useDetailContext = () => {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("useDetailContext must be used within a DetailProvider");
  }
  return context;
};

interface DetailProviderProps {
  children: ReactNode;
}

export const DetailProvider = ({ children }: DetailProviderProps) => {
  const [selectedUser, setSelectedUserState] = useState<User | null>(null);
  const [selectedRepo, setSelectedRepoState] = useState<Repo | null>(null);

  const setSelectedUser = (user: User | null) => {
    if (user) {
      setSelectedRepoState(null);
    }
    setSelectedUserState(user);
  };

  const setSelectedRepo = (repo: Repo | null) => {
    if (repo) {
      setSelectedUserState(null);
    }
    setSelectedRepoState(repo);
  };

  const closeAllDetails = () => {
    setSelectedUserState(null);
    setSelectedRepoState(null);
  };

  return (
    <DetailContext.Provider
      value={{
        selectedUser,
        selectedRepo,
        setSelectedUser,
        setSelectedRepo,
        closeAllDetails,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
