import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListUsers from "../index";
import useGetUsers from "@/api/users/useGetUsers";
import { useDetailContext } from "@/providers/DetailProvider";

jest.mock("@/api/users/useGetUsers");
jest.mock("@/providers/DetailProvider");
jest.mock("../SearchInput", () => {
  return function MockSearchInput({
    searchQuery,
    onSearchQueryChange,
    onSearch,
    onKeyPress,
    isLoading,
  }: any) {
    return (
      <div>
        <input
          data-testid="search-input"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={onKeyPress}
          disabled={isLoading}
        />
        <button data-testid="search-button" onClick={onSearch}>
          Search
        </button>
      </div>
    );
  };
});
jest.mock("../UserItem", () => {
  return function MockUserItem({ user, onViewDetails }: any) {
    return (
      <div data-testid={`user-item-${user.id}`}>
        <span>{user.login}</span>
        <button onClick={() => onViewDetails(user)}>View Details</button>
      </div>
    );
  };
});

const mockUseGetUsers = useGetUsers as jest.MockedFunction<any>;
const mockUseDetailContext = useDetailContext as jest.MockedFunction<any>;

const mockSetSelectedUser = jest.fn();

describe("ListUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDetailContext.mockReturnValue({
      setSelectedUser: mockSetSelectedUser,
    });
  });

  it("renders initial empty state", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);

    expect(screen.getByText("Start searching for users")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Enter a GitHub username in the search box above to find users.",
      ),
    ).toBeInTheDocument();
  });

  it("shows loading state when searching", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
      error: null,
    });

    render(<ListUsers />);

    expect(screen.getByText("Searching users...")).toBeInTheDocument();
    expect(
      screen.getByText("Please wait while we search for GitHub users."),
    ).toBeInTheDocument();
  });

  it("handles search functionality", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);

    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "testuser" } });
    fireEvent.click(searchButton);

    expect(mockUseGetUsers).toHaveBeenCalledWith({
      enable: true,
      params: {
        q: "testuser",
        per_page: 5,
        page: 1,
      },
    });
  });

  it("handles Enter key press for search", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);
    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "testuser" } });
    fireEvent.keyPress(searchInput, { key: "Enter" });

    expect(mockUseGetUsers).toHaveBeenCalled();
  });

  it("displays users when data is available", () => {
    const mockUsers = [
      { id: 1, login: "user1", avatar_url: "avatar1.jpg" },
      { id: 2, login: "user2", avatar_url: "avatar2.jpg" },
    ];

    mockUseGetUsers.mockReturnValue({
      data: { items: mockUsers },
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);

    // Trigger search first
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("search-button"));

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("shows no users found state", () => {
    mockUseGetUsers.mockReturnValue({
      data: { items: [] },
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);

    // Trigger search first
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "nonexistentuser" } });
    fireEvent.click(screen.getByTestId("search-button"));

    expect(screen.getByText("No users found")).toBeInTheDocument();
    expect(
      screen.getByText(
        'No results for "nonexistentuser". Try using different search keywords.',
      ),
    ).toBeInTheDocument();
  });

  it("handles error state", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
      error: { message: "Network error" },
    });

    render(<ListUsers />);

    expect(screen.getByText("Search Failed")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  it("handles rate limit error", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
      error: { message: "API rate limit exceeded" },
    });

    render(<ListUsers />);

    expect(screen.getByText("API Rate Limit Exceeded")).toBeInTheDocument();
    expect(screen.getByText(/API rate limit exceeded/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please try again later or consider using GitHub authentication/,
      ),
    ).toBeInTheDocument();
  });

  it("handles view details functionality", () => {
    const mockUser = { id: 1, login: "testuser", avatar_url: "avatar.jpg" };

    mockUseGetUsers.mockReturnValue({
      data: { items: [mockUser] },
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);

    // Trigger search first
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("search-button"));

    const viewDetailsButton = screen.getByText("View Details");
    fireEvent.click(viewDetailsButton);

    expect(mockSetSelectedUser).toHaveBeenCalledWith(mockUser);
  });

  it("handles reset search functionality", () => {
    mockUseGetUsers.mockReturnValue({
      data: { items: [] },
      isError: false,
      isLoading: false,
      error: null,
    });

    render(<ListUsers />);

    // Trigger search first
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("search-button"));

    const resetButton = screen.getByText("Reset Search");
    fireEvent.click(resetButton);

    expect(mockUseGetUsers).toHaveBeenCalledWith({
      enable: false,
      params: {
        q: "",
        per_page: 5,
        page: 1,
      },
    });
  });

  it("handles try again functionality", () => {
    mockUseGetUsers.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
      error: { message: "Network error" },
    });

    render(<ListUsers />);

    // Set search query first
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const tryAgainButton = screen.getByText("Try Again");
    fireEvent.click(tryAgainButton);

    expect(mockUseGetUsers).toHaveBeenCalledWith({
      enable: true,
      params: {
        q: "test",
        per_page: 5,
        page: 1,
      },
    });
  });
});
