"use client";

import useGetUsers from "@/api/users/useGetUsers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { useState } from "react";
import { Search, Users } from "lucide-react";

const ListUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");

  const { data, isError, isLoading } = useGetUsers({
    enable: !!currentQuery,
    params: {
      q: currentQuery,
      per_page: 5,
      page: 1,
    },
  });

  const handleSearch = () => {
    setCurrentQuery(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-auto max-w-2xl p-4">
      <div className="mb-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search users..."
        />
        <Button
          className="mt-4 w-full"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while searching users.</p>}

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
          <Accordion type="single" collapsible>
            {data.items.map((user) => (
              <AccordionItem key={user.id} value={`${user.id}`}>
                <AccordionTrigger>{user.login}</AccordionTrigger>
                <AccordionContent>
                  <p>User ID: {user.id}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default ListUsers;
