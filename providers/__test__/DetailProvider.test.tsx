import React from "react";
import { render, renderHook, act } from "@testing-library/react";
import { DetailProvider, useDetailContext } from "../DetailProvider";
import { User } from "@/types/users";
import { Repo } from "@/types/repos";

const mockUser: User = {
  id: 1,
  login: "testuser",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/testuser",
  type: "User",
  node_id: "MDQ6VXNlcjE=",
  url: "https://api.github.com/users/testuser",
  followers_url: "https://api.github.com/users/testuser/followers",
  following_url: "https://api.github.com/users/testuser/following{/other_user}",
  gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
  starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
  organizations_url: "https://api.github.com/users/testuser/orgs",
  repos_url: "https://api.github.com/users/testuser/repos",
  events_url: "https://api.github.com/users/testuser/events{/privacy}",
  received_events_url: "https://api.github.com/users/testuser/received_events",
  gravatar_id: "",
  site_admin: false,
  user_view_type: "User",
};

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
  description: null,
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
  homepage: null,
  size: 132,
  stargazers_count: 0,
  watchers_count: 0,
  language: "TypeScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 0,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: null,
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

describe("DetailProvider", () => {
  it("should throw error when useDetailContext is used outside provider", () => {
    const TestComponent = () => {
      useDetailContext();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useDetailContext must be used within a DetailProvider",
    );
  });

  it("should provide initial state", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    expect(result.current.selectedUser).toBeNull();
    expect(result.current.selectedRepo).toBeNull();
  });

  it("should set selected user and clear selected repo", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedUser(mockUser);
    });

    expect(result.current.selectedUser).toEqual(mockUser);
    expect(result.current.selectedRepo).toBeNull();
  });

  it("should set selected repo and clear selected user", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedRepo(mockRepo);
    });

    expect(result.current.selectedRepo).toEqual(mockRepo);
    expect(result.current.selectedUser).toBeNull();
  });

  it("should clear selected repo when setting new user", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedRepo(mockRepo);
    });

    act(() => {
      result.current.setSelectedUser(mockUser);
    });

    expect(result.current.selectedUser).toEqual(mockUser);
    expect(result.current.selectedRepo).toBeNull();
  });

  it("should clear selected user when setting new repo", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedUser(mockUser);
    });

    act(() => {
      result.current.setSelectedRepo(mockRepo);
    });

    expect(result.current.selectedRepo).toEqual(mockRepo);
    expect(result.current.selectedUser).toBeNull();
  });

  it("should close all details", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedUser(mockUser);
      result.current.setSelectedRepo(mockRepo);
    });

    act(() => {
      result.current.closeAllDetails();
    });

    expect(result.current.selectedUser).toBeNull();
    expect(result.current.selectedRepo).toBeNull();
  });

  it("should handle setting user to null", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedUser(mockUser);
    });

    act(() => {
      result.current.setSelectedUser(null);
    });

    expect(result.current.selectedUser).toBeNull();
  });

  it("should handle setting repo to null", () => {
    const { result } = renderHook(() => useDetailContext(), {
      wrapper: DetailProvider,
    });

    act(() => {
      result.current.setSelectedRepo(mockRepo);
    });

    act(() => {
      result.current.setSelectedRepo(null);
    });

    expect(result.current.selectedRepo).toBeNull();
  });
});
