import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListRepos from "../index";
import { useDetailContext } from "@/providers/DetailProvider";
import useGetReposInfinite from "@/api/repos/useGetReposInfinite";
import { User } from "@/types/users";
import { Repo } from "@/types/repos";

jest.mock("@/api/repos/useGetReposInfinite");
jest.mock("@/providers/DetailProvider");
jest.mock("react-infinite-scroll-component", () => {
  return function InfiniteScroll({
    children,
    next,
    hasMore,
    loader,
    endMessage,
  }: any) {
    return (
      <div data-testid="infinite-scroll">
        {children}
        {hasMore && (
          <button onClick={next} data-testid="load-more">
            Load More
          </button>
        )}
        {!hasMore && endMessage}
        {loader}
      </div>
    );
  };
});

const mockUseGetReposInfinite = useGetReposInfinite as jest.MockedFunction<any>;
const mockUseDetailContext = useDetailContext as jest.MockedFunction<any>;

const mockUser: User = {
  id: 1,
  login: "testuser",
  avatar_url: "https://example.com/avatar.jpg",
  html_url: "https://github.com/testuser",
  site_admin: false,
  type: "User",
  node_id: "MDQ6VXNlcjU3NjcyNzEw",
  gravatar_id: "",
  url: "https://api.github.com/users/thoriqdharmawan",
  followers_url: "https://api.github.com/users/thoriqdharmawan/followers",
  following_url:
    "https://api.github.com/users/thoriqdharmawan/following{/other_user}",
  gists_url: "https://api.github.com/users/thoriqdharmawan/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/thoriqdharmawan/starred{/owner}{/repo}",
  subscriptions_url:
    "https://api.github.com/users/thoriqdharmawan/subscriptions",
  organizations_url: "https://api.github.com/users/thoriqdharmawan/orgs",
  repos_url: "https://api.github.com/users/thoriqdharmawan/repos",
  events_url: "https://api.github.com/users/thoriqdharmawan/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/thoriqdharmawan/received_events",
  user_view_type: "public",
};

const mockRepo: Repo = {
  id: 1,
  name: "test-repo",
  full_name: "testuser/test-repo",
  description: "Test repository",
  html_url: "https://github.com/testuser/test-repo",
  stargazers_count: 10,
  forks_count: 5,
  language: "TypeScript",
  updated_at: "2023-01-01T00:00:00Z",
  node_id: "MDEwOlJlcG9zaXRvcnkzMjE0NjY0MQ==",
  private: false,
  owner: {
    login: "thoriq",
    id: 3139328,
    node_id: "MDQ6VXNlcjMxMzkzMjg=",
    avatar_url: "https://avatars.githubusercontent.com/u/3139328?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/thoriq",
    html_url: "https://github.com/thoriq",
    followers_url: "https://api.github.com/users/thoriq/followers",
    following_url: "https://api.github.com/users/thoriq/following{/other_user}",
    gists_url: "https://api.github.com/users/thoriq/gists{/gist_id}",
    starred_url: "https://api.github.com/users/thoriq/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/thoriq/subscriptions",
    organizations_url: "https://api.github.com/users/thoriq/orgs",
    repos_url: "https://api.github.com/users/thoriq/repos",
    events_url: "https://api.github.com/users/thoriq/events{/privacy}",
    received_events_url: "https://api.github.com/users/thoriq/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
  fork: true,
  url: "https://api.github.com/repos/thoriq/opensourcepos",
  forks_url: "https://api.github.com/repos/thoriq/opensourcepos/forks",
  keys_url: "https://api.github.com/repos/thoriq/opensourcepos/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/thoriq/opensourcepos/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/thoriq/opensourcepos/teams",
  hooks_url: "https://api.github.com/repos/thoriq/opensourcepos/hooks",
  issue_events_url:
    "https://api.github.com/repos/thoriq/opensourcepos/issues/events{/number}",
  events_url: "https://api.github.com/repos/thoriq/opensourcepos/events",
  assignees_url:
    "https://api.github.com/repos/thoriq/opensourcepos/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/thoriq/opensourcepos/branches{/branch}",
  tags_url: "https://api.github.com/repos/thoriq/opensourcepos/tags",
  blobs_url:
    "https://api.github.com/repos/thoriq/opensourcepos/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/thoriq/opensourcepos/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/thoriq/opensourcepos/git/refs{/sha}",
  trees_url:
    "https://api.github.com/repos/thoriq/opensourcepos/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/thoriq/opensourcepos/statuses/{sha}",
  languages_url: "https://api.github.com/repos/thoriq/opensourcepos/languages",
  stargazers_url:
    "https://api.github.com/repos/thoriq/opensourcepos/stargazers",
  contributors_url:
    "https://api.github.com/repos/thoriq/opensourcepos/contributors",
  subscribers_url:
    "https://api.github.com/repos/thoriq/opensourcepos/subscribers",
  subscription_url:
    "https://api.github.com/repos/thoriq/opensourcepos/subscription",
  commits_url:
    "https://api.github.com/repos/thoriq/opensourcepos/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/thoriq/opensourcepos/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/thoriq/opensourcepos/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/thoriq/opensourcepos/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/thoriq/opensourcepos/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/thoriq/opensourcepos/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/thoriq/opensourcepos/merges",
  archive_url:
    "https://api.github.com/repos/thoriq/opensourcepos/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/thoriq/opensourcepos/downloads",
  issues_url:
    "https://api.github.com/repos/thoriq/opensourcepos/issues{/number}",
  pulls_url: "https://api.github.com/repos/thoriq/opensourcepos/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/thoriq/opensourcepos/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/thoriq/opensourcepos/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/thoriq/opensourcepos/labels{/name}",
  releases_url:
    "https://api.github.com/repos/thoriq/opensourcepos/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/thoriq/opensourcepos/deployments",
  created_at: "2015-03-13T09:16:45Z",
  pushed_at: "2015-03-11T07:38:00Z",
  git_url: "git://github.com/thoriq/opensourcepos.git",
  ssh_url: "git@github.com:thoriq/opensourcepos.git",
  clone_url: "https://github.com/thoriq/opensourcepos.git",
  svn_url: "https://github.com/thoriq/opensourcepos",
  homepage: null,
  size: 10618,
  watchers_count: 0,
  has_issues: false,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: {
    key: "mit",
    name: "MIT License",
    spdx_id: "MIT",
    url: "https://api.github.com/licenses/mit",
    node_id: "MDc6TGljZW5zZTEz",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [],
  visibility: "public",
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: "master",
};

const mockSetSelectedRepo = jest.fn();

describe("ListRepos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDetailContext.mockReturnValue({
      setSelectedRepo: mockSetSelectedRepo,
    });
  });

  it("renders loading state when loading", () => {
    mockUseGetReposInfinite.mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    expect(screen.getByText("Loading repositories...")).toBeInTheDocument();
    expect(
      screen.getByText("Fetching user's repositories from GitHub."),
    ).toBeInTheDocument();
  });

  it("renders error state when there is an error", () => {
    const mockError = new Error("API Error");
    mockUseGetReposInfinite.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: mockError,
    });

    render(<ListRepos user={mockUser} />);

    expect(screen.getByText("Failed to Load Repositories")).toBeInTheDocument();
    expect(screen.getByText("API Error")).toBeInTheDocument();
  });

  it("renders rate limit error state correctly", () => {
    const mockError = new Error("API rate limit exceeded");
    mockUseGetReposInfinite.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: mockError,
    });

    render(<ListRepos user={mockUser} />);

    expect(screen.getByText("API Rate Limit Exceeded")).toBeInTheDocument();
    expect(
      screen.getByText(/Please try again later or login with GitHub/),
    ).toBeInTheDocument();
  });

  it("renders empty state when no repositories", () => {
    mockUseGetReposInfinite.mockReturnValue({
      data: { pages: [{ data: [] }] },
      isError: false,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    expect(screen.getByText("No Repositories")).toBeInTheDocument();
    expect(
      screen.getByText("This user doesn't have any public repositories."),
    ).toBeInTheDocument();
  });

  it("renders repositories list when data is available", () => {
    mockUseGetReposInfinite.mockReturnValue({
      data: { pages: [{ data: [mockRepo] }] },
      isError: false,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    expect(screen.getByTestId("infinite-scroll")).toBeInTheDocument();
  });

  it("calls refetch when retry is clicked", async () => {
    const mockRefetch = jest.fn();
    const mockError = new Error("API Error");

    mockUseGetReposInfinite.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
      refetch: mockRefetch,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: mockError,
    });

    render(<ListRepos user={mockUser} />);

    const retryButton = screen.getByRole("button");
    fireEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("loads more repositories when hasNextPage is true", async () => {
    const mockFetchNextPage = jest.fn();

    mockUseGetReposInfinite.mockReturnValue({
      data: { pages: [{ data: [mockRepo] }] },
      isError: false,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    const loadMoreButton = screen.getByTestId("load-more");
    fireEvent.click(loadMoreButton);

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it("does not load more when isFetchingNextPage is true", () => {
    const mockFetchNextPage = jest.fn();

    mockUseGetReposInfinite.mockReturnValue({
      data: { pages: [{ data: [mockRepo] }] },
      isError: false,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    const loadMoreButton = screen.getByTestId("load-more");
    fireEvent.click(loadMoreButton);

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it("flattens multiple pages of repositories correctly", () => {
    const repo1 = { ...mockRepo, id: 1, name: "repo1" };
    const repo2 = { ...mockRepo, id: 2, name: "repo2" };

    mockUseGetReposInfinite.mockReturnValue({
      data: {
        pages: [{ data: [repo1] }, { data: [repo2] }],
      },
      isError: false,
      isLoading: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    expect(screen.getByTestId("infinite-scroll")).toBeInTheDocument();
  });

  it("passes correct parameters to useGetReposInfinite hook", () => {
    mockUseGetReposInfinite.mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
    });

    render(<ListRepos user={mockUser} />);

    expect(mockUseGetReposInfinite).toHaveBeenCalledWith({
      enable: true,
      user: "testuser",
      params: {
        sort: "updated",
        per_page: 10,
      },
    });
  });

  it("handles user without login correctly", () => {
    const userWithoutLogin = { ...mockUser, login: "" };

    render(<ListRepos user={userWithoutLogin} />);

    expect(mockUseGetReposInfinite).toHaveBeenCalledWith({
      enable: false,
      user: "",
      params: {
        sort: "updated",
        per_page: 10,
      },
    });
  });
});
