import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import RepoDetail from "../index";
import { Repo } from "@/types/repos";

jest.mock("@/components/DetailWrapper", () => {
  return function MockDetailWrapper({
    children,
    title,
    onClose,
    hideHeader,
  }: any) {
    return (
      <div data-testid="detail-wrapper">
        {!hideHeader && <div data-testid="header">{title}</div>}
        <button onClick={onClose} data-testid="close-button">
          Close
        </button>
        {children}
      </div>
    );
  };
});

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, variant, size, className }: any) => (
    <button onClick={onClick} data-testid="button" className={className}>
      {children}
    </button>
  ),
}));

jest.mock("lucide-react", () => ({
  ExternalLink: () => (
    <span data-testid="external-link-icon">ExternalLink</span>
  ),
  BookMarked: () => <span data-testid="book-marked-icon">BookMarked</span>,
  Star: () => <span data-testid="star-icon">Star</span>,
  GitFork: () => <span data-testid="git-fork-icon">GitFork</span>,
  AlertCircle: () => <span data-testid="alert-circle-icon">AlertCircle</span>,
  Globe: () => <span data-testid="globe-icon">Globe</span>,
  Calendar: () => <span data-testid="calendar-icon">Calendar</span>,
  Code: () => <span data-testid="code-icon">Code</span>,
  Eye: () => <span data-testid="eye-icon">Eye</span>,
  Scale: () => <span data-testid="scale-icon">Scale</span>,
  GitBranch: () => <span data-testid="git-branch-icon">GitBranch</span>,
  Download: () => <span data-testid="download-icon">Download</span>,
}));

jest.mock("@/lib/languageColors", () => ({
  getLanguageColor: jest.fn(() => "#3178c6"),
}));

jest.mock("@/utils", () => ({
  formatDate: jest.fn((date: string) => new Date(date).toLocaleDateString()),
}));

jest.mock("@/lib/utils", () => ({
  cn: jest.fn((...args) => args.filter(Boolean).join(" ")),
}));

const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
  writable: true,
});

const mockRepo: Repo = {
  id: 995484780,
  node_id: "R_kgDOO1XkbA",
  name: "github-repositories-explorer",
  full_name: "thoriqdharmawan/github-repositories-explorer",
  private: false,
  owner: {
    login: "thoriqdharmawan",
    id: 57672710,
    node_id: "MDQ6VXNlcjU3NjcyNzEw",
    avatar_url: "https://avatars.githubusercontent.com/u/57672710?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/thoriqdharmawan",
    html_url: "https://github.com/thoriqdharmawan",
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
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
  html_url: "https://github.com/thoriqdharmawan/github-repositories-explorer",
  description: "An application to explore GitHub repositories",
  fork: false,
  url: "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer",
  forks_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/forks",
  keys_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/collaborators{/collaborator}",
  teams_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/teams",
  hooks_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/hooks",
  issue_events_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/issues/events{/number}",
  events_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/events",
  assignees_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/branches{/branch}",
  tags_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/tags",
  blobs_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/git/refs{/sha}",
  trees_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/statuses/{sha}",
  languages_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/languages",
  stargazers_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/stargazers",
  contributors_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/contributors",
  subscribers_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/subscribers",
  subscription_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/subscription",
  commits_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/compare/{base}...{head}",
  merges_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/merges",
  archive_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/{archive_format}{/ref}",
  downloads_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/downloads",
  issues_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/issues{/number}",
  pulls_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/notifications{?since,all,participating}",
  labels_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/labels{/name}",
  releases_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/thoriqdharmawan/github-repositories-explorer/deployments",
  created_at: "2025-06-03T14:50:42Z",
  updated_at: "2025-06-03T14:56:11Z",
  pushed_at: "2025-06-03T14:56:10Z",
  git_url: "git://github.com/thoriqdharmawan/github-repositories-explorer.git",
  ssh_url: "git@github.com:thoriqdharmawan/github-repositories-explorer.git",
  clone_url:
    "https://github.com/thoriqdharmawan/github-repositories-explorer.git",
  svn_url: "https://github.com/thoriqdharmawan/github-repositories-explorer",
  homepage: "https://test-repo.com",
  size: 512 * 2,
  stargazers_count: 1,
  watchers_count: 3,
  language: "TypeScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 2,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 4,
  license: {
    name: "MIT License",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [],
  visibility: "public",
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: "main",
};

const mockForkedRepo: Repo = {
  ...mockRepo,
  fork: true,
};

const mockRepoWithManyTopics: Repo = {
  ...mockRepo,
  topics: [
    "react",
    "typescript",
    "javascript",
    "nodejs",
    "express",
    "mongodb",
    "testing",
    "jest",
    "cypress",
    "docker",
    "kubernetes",
  ],
};

const mockRepoWithoutHomepage: Repo = {
  ...mockRepo,
  homepage: null,
};

describe("RepoDetail Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display repository information correctly", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(
      screen.getByText("github-repositories-explorer"),
    ).toBeInTheDocument();
    expect(screen.getByText("thoriqdharmawan")).toBeInTheDocument();
    expect(
      screen.getByText("An application to explore GitHub repositories"),
    ).toBeInTheDocument();
  });

  it("should display repository avatar with correct src and alt", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    const avatar = screen.getByAltText("thoriqdharmawan");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/57672710?v=4",
    );
  });

  it("should show forked repository badge when repo is a fork", () => {
    render(<RepoDetail repo={mockForkedRepo} onClose={mockOnClose} />);

    expect(screen.getByText("Forked Repository")).toBeInTheDocument();
  });

  it("should not show forked repository badge when repo is not a fork", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.queryByText("Forked Repository")).not.toBeInTheDocument();
  });

  it("should display topics correctly and limit to 8", () => {
    render(<RepoDetail repo={mockRepoWithManyTopics} onClose={mockOnClose} />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("+3 more")).toBeInTheDocument();
  });

  it("should render View Repository button and open repository on click", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    const repoButton = screen.getByText("View Repository").closest("button");
    expect(repoButton).toBeInTheDocument();

    fireEvent.click(repoButton!);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://github.com/thoriqdharmawan/github-repositories-explorer",
      "_blank",
    );
  });

  it("should render Website button when homepage exists", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    const websiteButton = screen.getByText("Website").closest("button");
    expect(websiteButton).toBeInTheDocument();

    fireEvent.click(websiteButton!);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://test-repo.com",
      "_blank",
    );
  });

  it("should not render Website button when homepage does not exist", () => {
    render(<RepoDetail repo={mockRepoWithoutHomepage} onClose={mockOnClose} />);

    expect(screen.queryByText("Website")).not.toBeInTheDocument();
  });

  it("should display statistics correctly", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.getByText("Statistics")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // Stars
    expect(screen.getByText("2")).toBeInTheDocument(); // Forks
    expect(screen.getByText("3")).toBeInTheDocument(); // Watchers
    expect(screen.getByText("4")).toBeInTheDocument(); // Open Issues
  });

  it("should display repository information section", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.getByText("Information")).toBeInTheDocument();
    expect(screen.getByText("Primary Language")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Repository Size")).toBeInTheDocument();
    expect(screen.getByText("1.0 MB")).toBeInTheDocument();
    expect(screen.getByText("Default Branch")).toBeInTheDocument();
    expect(screen.getByText("main")).toBeInTheDocument();
  });

  it("should display license information when available", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.getByText("License")).toBeInTheDocument();
    expect(screen.getByText("MIT License")).toBeInTheDocument();
  });

  it("should format repository size correctly", () => {
    const smallRepo = { ...mockRepo, size: 512 };
    render(<RepoDetail repo={smallRepo} onClose={mockOnClose} />);

    expect(screen.getByText("512 KB")).toBeInTheDocument();
  });

  it("should display features section with correct status", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getAllByText("Enabled")).toHaveLength(4); // Issues, Projects, Pages, Downloads
    expect(screen.getAllByText("Disabled")).toHaveLength(2); // Wiki, Discussions
  });

  it("should render API endpoints section", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Repository")).toBeInTheDocument();
    expect(screen.getByText("Clone URL")).toBeInTheDocument();
    expect(screen.getAllByText("Issues")[0]).toBeInTheDocument();
    expect(screen.getByText("Pull Requests")).toBeInTheDocument();
    expect(screen.getByText("Branches")).toBeInTheDocument();
    expect(screen.getByText("Contributors")).toBeInTheDocument();
    expect(screen.getByText("Releases")).toBeInTheDocument();
  });

  it("should hide header when hideHeader prop is true", () => {
    render(
      <RepoDetail repo={mockRepo} onClose={mockOnClose} hideHeader={true} />,
    );

    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
  });

  it("should handle repository without description", () => {
    const repoWithoutDesc = { ...mockRepo, description: null };
    render(<RepoDetail repo={repoWithoutDesc} onClose={mockOnClose} />);

    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it("should display date information correctly", () => {
    render(<RepoDetail repo={mockRepo} onClose={mockOnClose} />);

    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Last Updated")).toBeInTheDocument();
    expect(screen.getByText("Last Push")).toBeInTheDocument();
  });
});
