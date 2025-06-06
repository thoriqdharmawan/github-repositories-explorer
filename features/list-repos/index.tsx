import useGetReposInfinite from "@/api/repos/useGetReposInfinite";
import { User } from "@/types/users";
import { Repo } from "@/types/repos";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import ErrorActions from "@/components/ui/error-actions";
import { FC, useMemo } from "react";
import { GitBranch } from "lucide-react";
import { useDetailContext } from "@/providers/DetailProvider";
import RepoItem from "./RepoItem";
import InfiniteScroll from "react-infinite-scroll-component";

interface ListReposProps {
  user: User;
}

const ListRepos: FC<ListReposProps> = ({ user }) => {
  const { setSelectedRepo } = useDetailContext();

  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useGetReposInfinite({
    enable: !!user.login,
    user: user.login,
    params: {
      sort: "updated",
      per_page: 10,
    },
  });

  const errorMessage =
    error?.message || "Unable to fetch repositories for this user.";
  const isRateLimitError = errorMessage.includes("rate limit exceeded");

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

  const handleRepoClick = (repo: Repo) => {
    setSelectedRepo(repo);
  };

  return (
    <div className="flex-1">
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
          title={
            isRateLimitError
              ? "API Rate Limit Exceeded"
              : "Failed to Load Repositories"
          }
          description={
            isRateLimitError
              ? errorMessage +
                " Please try again later or login with GitHub for higher rate limits."
              : errorMessage
          }
          action={
            <ErrorActions
              onRetry={handleRetry}
              isRateLimitError={isRateLimitError}
            />
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
            {allRepos.map((repo, idx) => {
              const pagePosition = idx % 10;
              const delayClass = `animate-delay-${Math.min(pagePosition * 100 + 100, 1000)}`;

              return (
                <div
                  key={`${repo.id}-${idx}`}
                  className={`animate-fade-in-right mb-4 flex flex-col gap-4 ${delayClass}`}
                >
                  <RepoItem repo={repo} onRepoClick={handleRepoClick} />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default ListRepos;
