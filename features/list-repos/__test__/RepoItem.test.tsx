import { render, screen, fireEvent } from "@testing-library/react";
import RepoItem from "../RepoItem";
import { Repo } from "@/types/repos";

jest.mock("@/lib/languageColors", () => ({
  getLanguageColor: jest.fn((language: string) => "#000000"),
}));

jest.mock("@/utils", () => ({
  formatDate: jest.fn((date: string) => "Jan 1, 2023"),
}));

const mockRepo: Repo = {
  id: 1,
  name: "test-repo",
  full_name: "testuser/test-repo",
  html_url: "https://github.com/testuser/test-repo",
  description: "A test repository",
  stargazers_count: 100,
  forks_count: 25,
  language: "TypeScript",
  topics: ["javascript", "typescript", "react"],
  open_issues_count: 5,
  homepage: "https://example.com",
  updated_at: "2023-01-01T00:00:00Z",
  fork: false,
  node_id: "MDEwOlJlcG9zaXRvcnkzMjE0NjY0MQ==",
  private: false,
  owner: {
    login: "testuser",
    id: 3139328,
    node_id: "MDQ6VXNlcjMxMzkzMjg=",
    avatar_url: "https://github.com/testuser.png",
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
  visibility: "public",
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: "master",
};

describe("RepoItem", () => {
  it("renders repository information correctly", () => {
    render(<RepoItem repo={mockRepo} />);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repository")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("calls onRepoClick when clicked", () => {
    const onRepoClick = jest.fn();
    render(<RepoItem repo={mockRepo} onRepoClick={onRepoClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onRepoClick).toHaveBeenCalledWith(mockRepo);
  });

  it("displays fork indicator when repository is forked", () => {
    const forkedRepo = { ...mockRepo, fork: true };
    render(<RepoItem repo={forkedRepo} />);

    expect(screen.getByText("Forked repository")).toBeInTheDocument();
  });

  it("shows fallback when no description is provided", () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    render(<RepoItem repo={repoWithoutDescription} />);

    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });

  it("displays topics with limit of 5", () => {
    const repoWithManyTopics = {
      ...mockRepo,
      topics: [
        "topic1",
        "topic2",
        "topic3",
        "topic4",
        "topic5",
        "topic6",
        "topic7",
      ],
    };
    render(<RepoItem repo={repoWithManyTopics} />);

    expect(screen.getByText("topic1")).toBeInTheDocument();
    expect(screen.getByText("topic5")).toBeInTheDocument();
    expect(screen.getByText("+2 more")).toBeInTheDocument();
  });

  it("displays open issues count when greater than 0", () => {
    render(<RepoItem repo={mockRepo} />);
    expect(screen.getByText("5 issues")).toBeInTheDocument();
  });

  it("hides issues section when count is 0", () => {
    const repoWithoutIssues = { ...mockRepo, open_issues_count: 0 };
    render(<RepoItem repo={repoWithoutIssues} />);

    expect(screen.queryByText("issues")).not.toBeInTheDocument();
  });

  it("displays website link when homepage is provided", () => {
    render(<RepoItem repo={mockRepo} />);

    const websiteLink = screen.getByText("Website").closest("a");
    expect(websiteLink).toHaveAttribute("href", "https://example.com");
    expect(websiteLink).toHaveAttribute("target", "_blank");
  });

  it("hides website link when no homepage is provided", () => {
    const repoWithoutHomepage = { ...mockRepo, homepage: null };
    render(<RepoItem repo={repoWithoutHomepage} />);

    expect(screen.queryByText("Website")).not.toBeInTheDocument();
  });

  it("prevents event propagation when clicking on external links", () => {
    const onRepoClick = jest.fn();
    render(<RepoItem repo={mockRepo} onRepoClick={onRepoClick} />);

    const repoLink = screen.getByText("test-repo").closest("a");
    fireEvent.click(repoLink!);

    expect(onRepoClick).not.toHaveBeenCalled();
  });

  it("displays unknown repository when name is not provided", () => {
    const repoWithoutName = { ...mockRepo, name: "" };
    render(<RepoItem repo={repoWithoutName} />);

    expect(screen.getByText("Unknown Repository")).toBeInTheDocument();
  });

  it("hides language section when no language is specified", () => {
    const repoWithoutLanguage = { ...mockRepo, language: "" };
    render(<RepoItem repo={repoWithoutLanguage} />);

    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });

  it("displays updated date correctly", () => {
    render(<RepoItem repo={mockRepo} />);
    expect(screen.getByText("Updated Jan 1, 2023")).toBeInTheDocument();
  });
});
