import { Repo } from "@/types/repos";
import {
  BookMarked,
  Star,
  GitFork,
  AlertCircle,
  Globe,
  Calendar,
} from "lucide-react";
import { FC } from "react";
import { getLanguageColor } from "@/lib/languageColors";

interface RepoItem {
  repo: Repo;
}

const RepoItem: FC<RepoItem> = ({ repo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex flex-1 items-center gap-2">
          <BookMarked className="text-blue-600" size={18} />
          <div className="flex-1">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                {repo.name || "Unknown Repository"}
              </h3>
            </a>
            {repo.fork && (
              <span className="text-xs text-gray-500 italic">
                Forked repository
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star size={14} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={14} />
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="h-6 w-6 rounded-full"
        />
        <span className="text-sm text-gray-600">
          by <span className="font-medium">{repo.owner.login}</span>
        </span>
      </div>

      <p className="mb-3 text-sm text-gray-600">
        {repo.description || (
          <span className="italic">No description available.</span>
        )}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {repo.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 5 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{repo.topics.length - 5} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span>{repo.language}</span>
            </div>
          )}

          {repo.open_issues_count > 0 && (
            <div className="flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{repo.open_issues_count} issues</span>
            </div>
          )}

          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <Globe size={12} />
              <span>Website</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>Updated {formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
