"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

const SearchInput = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onKeyPress,
  isLoading = false,
}: SearchInputProps) => {
  return (
    <div className="mb-4">
      <Input
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        onKeyDown={onKeyPress}
        placeholder="Search users..."
      />
      <Button className="mt-4 w-full" onClick={onSearch} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default SearchInput;
