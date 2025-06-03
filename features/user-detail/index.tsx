"use client";

import { User } from "@/types/users";
import { FC } from "react";
import { X, ExternalLink, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDetailProps {
  user: User;
  onClose: () => void;
  hideHeader?: boolean;
}

const UserDetail: FC<UserDetailProps> = ({
  user,
  onClose,
  hideHeader = false,
}) => {
  const endpoints = [
    { label: "Profile", url: user.url },
    { label: "Repositories", url: user.repos_url },
    { label: "Followers", url: user.followers_url },
    {
      label: "Following",
      url: user.following_url.replace("{/other_user}", ""),
    },
    { label: "Gists", url: user.gists_url.replace("{/gist_id}", "") },
    { label: "Organizations", url: user.organizations_url },
  ];

  return (
    <div
      className={`bg-card h-full overflow-y-auto p-6 ${!hideHeader ? "border-l" : ""}`}
    >
      {!hideHeader && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">User Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="border-border mb-4 h-24 w-24 rounded-full border-2"
          />
          <h3 className="text-lg font-medium">{user.login}</h3>
          <p className="text-muted-foreground text-sm">ID: {user.id}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs capitalize">
              {user.type}
            </span>
            {user.site_admin && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                Admin
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.open(user.html_url, "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View GitHub Profile
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Information
          </h4>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <UserIcon className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">Username</p>
                <p className="text-muted-foreground text-sm">{user.login}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-4 w-4 items-center justify-center">
                <span className="text-muted-foreground font-mono text-xs">
                  #
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">User ID</p>
                <p className="text-muted-foreground text-sm">{user.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-4 w-4 items-center justify-center">
                <span className="text-muted-foreground font-mono text-xs">
                  @
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">Node ID</p>
                <p className="text-muted-foreground font-mono text-xs">
                  {user.node_id}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            API Endpoints
          </h4>

          <div className="space-y-2">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.label}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <span className="text-sm font-medium">{endpoint.label}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => window.open(endpoint.url, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
