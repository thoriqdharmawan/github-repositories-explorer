"use client";

import useGetUsers from "@/api/users/useGetUsers";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { useState } from "react";
import { Search, Users } from "lucide-react";
import SearchInput from "./SearchInput";
import UserItem from "./UserItem";

const ListUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");

  const { data, isError, isLoading, error } = useGetUsers({
    enable: !!currentQuery,
    params: {
      q: currentQuery,
      per_page: 5,
      page: 1,
    },
  });

  const errorMessage =
    error?.message ||
    "An error occurred while searching for users. Please try again.";
  const isRateLimitError = errorMessage.includes("rate limit exceeded");

  const handleSearch = () => {
    setCurrentQuery(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="m-auto max-w-2xl p-4">
      <SearchInput
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
      />

      <div>
        {isLoading && (
          <LoadingState
            size="sm"
            title="Searching users..."
            description="Please wait while we search for GitHub users."
          />
        )}
        {isError && (
          <ErrorState
            size="sm"
            title={
              isRateLimitError ? "API Rate Limit Exceeded" : "Search Failed"
            }
            description={
              isRateLimitError
                ? errorMessage +
                  " Please try again later or consider using GitHub authentication for higher rate limits."
                : errorMessage
            }
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuery(searchQuery);
                }}
              >
                Try Again
              </Button>
            }
          />
        )}

        {!isLoading &&
          !isError &&
          currentQuery &&
          (!data?.items || data.items.length === 0) && (
            <EmptyState
              icon={<Search className="text-muted-foreground h-8 w-8" />}
              title="No users found"
              description={`No results for "${currentQuery}". Try using different search keywords.`}
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentQuery("");
                    setSearchQuery("");
                  }}
                >
                  Reset Search
                </Button>
              }
            />
          )}

        {!isLoading && !isError && !currentQuery && (
          <EmptyState
            icon={<Users className="text-muted-foreground h-8 w-8" />}
            title="Start searching for users"
            description="Enter a GitHub username in the search box above to find users."
          />
        )}

        {data?.items && data.items.length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-muted-foreground text-sm">
                Showing users for "{currentQuery}"
              </h2>
            </div>

            <Accordion type="single" collapsible>
              {data.items.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
};

export default ListUsers;
