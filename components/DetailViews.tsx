"use client";

import { useDetailContext } from "@/providers/DetailProvider";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import UserDetail from "@/features/user-detail";
import RepoDetail from "@/features/repo-detail";

const DetailViews = () => {
  const { selectedUser, selectedRepo, setSelectedUser, setSelectedRepo } =
    useDetailContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleCloseUserDetail = () => {
    setSelectedUser(null);
  };

  const handleCloseRepoDetail = () => {
    setSelectedRepo(null);
  };

  const hasActiveDetail = selectedUser || selectedRepo;

  if (!isMobile) {
    return (
      <div
        className={`${
          hasActiveDetail ? "w-96" : "w-0"
        } bg-background sticky top-16 h-[calc(100vh-4rem)] overflow-hidden border-l transition-all duration-300 ease-in-out`}
        role="complementary"
      >
        <div
          className={`h-full w-96 transition-transform duration-300 ease-in-out ${
            hasActiveDetail ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedUser && (
            <UserDetail user={selectedUser} onClose={handleCloseUserDetail} />
          )}
          {selectedRepo && (
            <RepoDetail repo={selectedRepo} onClose={handleCloseRepoDetail} />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Drawer
        open={!!selectedUser}
        onOpenChange={(open) => !open && handleCloseUserDetail()}
      >
        <DrawerContent role="complementary" className="max-h-[90vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>User Details</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">
            {selectedUser && (
              <UserDetail
                user={selectedUser}
                onClose={handleCloseUserDetail}
                hideHeader
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={!!selectedRepo}
        onOpenChange={(open) => !open && handleCloseRepoDetail()}
      >
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>Repository Details</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">
            {selectedRepo && (
              <RepoDetail
                repo={selectedRepo}
                onClose={handleCloseRepoDetail}
                hideHeader
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DetailViews;
