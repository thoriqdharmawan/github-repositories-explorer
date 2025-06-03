import { Repo } from "@/types/repos";
import { FC } from "react";

interface RepoItem {
  repo: Repo;
}

const RepoItem: FC<RepoItem> = ({ repo }) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{repo.name}</h3>

      <p className="text-sm text-gray-600">
        {repo.description || "No description available."}
      </p>

      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {repo.html_url}
      </a>
    </div>
  );
};

export default RepoItem;
