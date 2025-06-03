import useGetReposInfinite from "@/api/repos/useGetReposInfinite";
import { User } from "@/types/users";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { FC, useMemo } from "react";
import { GitBranch, RefreshCw } from "lucide-react";
import RepoItem from "./RepoItem";
import InfiniteScroll from "react-infinite-scroll-component";

interface ListReposProps {
  user: User;
}

const ListRepos: FC<ListReposProps> = ({ user }) => {
  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReposInfinite({
    enable: !!user.login,
    user: user.login,
    params: {
      sort: "updated",
      per_page: 10,
    },
  });

  const allRepos = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data) || [];
  }, [data]);

  const handleRetry = () => {
    refetch();
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
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

      {!isLoading && !isError && allRepos.length === 0 && (
        <EmptyState
          size="sm"
          icon={<GitBranch className="text-muted-foreground h-6 w-6" />}
          title="No Repositories"
          description="This user doesn't have any public repositories."
        />
      )}

      {!isLoading && !isError && allRepos.length > 0 && (
        <div className="pl-5">
          <InfiniteScroll
            dataLength={allRepos.length}
            next={loadMore}
            hasMore={!!hasNextPage}
            loader={
              <div className="flex justify-center py-4">
                <LoadingState
                  size="sm"
                  title="Loading more repositories..."
                  description="Fetching additional repositories."
                />
              </div>
            }
            endMessage={
              <div className="text-muted-foreground py-4 text-center">
                <p>No more repositories to load.</p>
              </div>
            }
          >
            {allRepos.map((repo, idx) => (
              <div
                key={`${repo.id}-${idx}`}
                className="mb-4 flex flex-col gap-4"
              >
                <RepoItem repo={repo} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default ListRepos;
