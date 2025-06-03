import useGetRepos from "@/api/repos/useGetRepos";
import { User } from "@/types/users";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { GitBranch, RefreshCw } from "lucide-react";
import RepoItem from "./RepoItem";

interface ListReposProps {
  user: User;
}

const ListRepos: FC<ListReposProps> = ({ user }) => {
  const { data, isError, isLoading, refetch } = useGetRepos({
    enable: !!user.login,
    user: user.login,
    params: {
      sort: "updated",
      per_page: 5,
      page: 1,
    },
  });

  const handleRetry = () => {
    refetch();
  };

  return (
    <div>
      {isLoading && (
        <LoadingState
          size="sm"
          title="Loading repositories..."
          description="Fetching user's repositories from GitHub."
        />
      )}

      {isError && (
        <ErrorState
          size="sm"
          title="Failed to Load Repositories"
          description="Unable to fetch repositories for this user."
          action={
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          }
        />
      )}

      {!isLoading && !isError && data && data.length === 0 && (
        <EmptyState
          size="sm"
          icon={<GitBranch className="text-muted-foreground h-6 w-6" />}
          title="No Repositories"
          description="This user doesn't have any public repositories."
        />
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="pl-5">
          {data.map((repo) => (
            <div key={repo.id} className="mb-4 flex flex-col gap-4">
              <RepoItem repo={repo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListRepos;
