"use client";

import { Repo } from "@/types/repos";
import { FC } from "react";
import {
  ExternalLink,
  BookMarked,
  Star,
  GitFork,
  AlertCircle,
  Globe,
  Calendar,
  Code,
  Eye,
  Scale,
  GitBranch,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DetailWrapper from "@/components/DetailWrapper";
import { getLanguageColor } from "@/lib/languageColors";

interface RepoDetailProps {
  repo: Repo;
  onClose: () => void;
  hideHeader?: boolean;
}

const RepoDetail: FC<RepoDetailProps> = ({
  repo,
  onClose,
  hideHeader = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} KB`;
    return `${(size / 1024).toFixed(1)} MB`;
  };

  const endpoints = [
    { label: "Repository", url: repo.html_url },
    { label: "Clone URL", url: repo.clone_url },
    { label: "Issues", url: repo.issues_url.replace("{/number}", "") },
    { label: "Pull Requests", url: repo.pulls_url.replace("{/number}", "") },
    { label: "Branches", url: repo.branches_url.replace("{/branch}", "") },
    { label: "Contributors", url: repo.contributors_url },
    { label: "Releases", url: repo.releases_url.replace("{/id}", "") },
  ];

  return (
    <DetailWrapper
      title="Repository Details"
      onClose={onClose}
      hideHeader={hideHeader}
    >
      <div className="flex flex-col text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <BookMarked className="text-primary h-8 w-8" />
          <h3 className="text-xl font-semibold">{repo.name}</h3>
        </div>

        {repo.fork && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
              <GitFork size={12} />
              Forked Repository
            </span>
          </div>
        )}

        <p className="text-muted-foreground mb-4 text-sm">
          {repo.description || "No description available"}
        </p>

        <div className="mb-4 flex items-center justify-center gap-2">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="border-border h-8 w-8 rounded-full border"
          />
          <span className="text-sm">
            by{" "}
            <span className="text-foreground font-medium">
              {repo.owner.login}
            </span>
          </span>
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="mb-4 flex flex-wrap justify-center gap-1">
            {repo.topics.slice(0, 8).map((topic) => (
              <span
                key={topic}
                className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 8 && (
              <span className="text-muted-foreground px-2 py-1 text-xs">
                +{repo.topics.length - 8} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="default"
          className="w-full"
          onClick={() => window.open(repo.html_url, "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Repository
        </Button>

        {repo.homepage && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(repo.homepage!, "_blank")}
          >
            <Globe className="mr-2 h-4 w-4" />
            Website
          </Button>
        )}
      </div>

      {/* Repository Statistics */}
      <div className="space-y-4">
        <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Statistics
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Star className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Stars</p>
              <p className="text-muted-foreground text-sm">
                {repo.stargazers_count.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GitFork className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Forks</p>
              <p className="text-muted-foreground text-sm">
                {repo.forks_count.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Watchers</p>
              <p className="text-muted-foreground text-sm">
                {repo.watchers_count.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm font-medium">Open Issues</p>
              <p className="text-muted-foreground text-sm">
                {repo.open_issues_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Information
        </h4>

        <div className="space-y-3">
          {repo.language && (
            <div className="flex items-center gap-3">
              <Code className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">Primary Language</p>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  <p className="text-muted-foreground text-sm">
                    {repo.language}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Download className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Repository Size</p>
              <p className="text-muted-foreground text-sm">
                {formatSize(repo.size)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GitBranch className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Default Branch</p>
              <p className="text-muted-foreground text-sm">
                {repo.default_branch}
              </p>
            </div>
          </div>

          {repo.license && (
            <div className="flex items-center gap-3">
              <Scale className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">License</p>
                <p className="text-muted-foreground text-sm">
                  {repo.license.name || "Custom License"}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Created</p>
              <p className="text-muted-foreground text-sm">
                {formatDate(repo.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-muted-foreground text-sm">
                {formatDate(repo.updated_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Last Push</p>
              <p className="text-muted-foreground text-sm">
                {formatDate(repo.pushed_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Features
        </h4>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm">Issues</span>
            <span
              className={`text-xs ${repo.has_issues ? "text-green-600" : "text-gray-400"}`}
            >
              {repo.has_issues ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm">Projects</span>
            <span
              className={`text-xs ${repo.has_projects ? "text-green-600" : "text-gray-400"}`}
            >
              {repo.has_projects ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm">Wiki</span>
            <span
              className={`text-xs ${repo.has_wiki ? "text-green-600" : "text-gray-400"}`}
            >
              {repo.has_wiki ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm">Pages</span>
            <span
              className={`text-xs ${repo.has_pages ? "text-green-600" : "text-gray-400"}`}
            >
              {repo.has_pages ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm">Downloads</span>
            <span
              className={`text-xs ${repo.has_downloads ? "text-green-600" : "text-gray-400"}`}
            >
              {repo.has_downloads ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border p-2">
            <span className="text-sm">Discussions</span>
            <span
              className={`text-xs ${repo.has_discussions ? "text-green-600" : "text-gray-400"}`}
            >
              {repo.has_discussions ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Quick Links
        </h4>

        <div className="space-y-2">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.label}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <span className="text-sm font-medium">{endpoint.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => window.open(endpoint.url, "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DetailWrapper>
  );
};

export default RepoDetail;
