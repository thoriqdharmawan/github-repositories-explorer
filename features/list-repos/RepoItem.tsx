import { Repo } from "@/types/repos";
import { FC } from "react";

interface RepoItem {
  repo: Repo;
}

const RepoItem: FC<RepoItem> = ({ repo }) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{repo.name}</h3>

      <p className="text-sm text-gray-600">
        {repo.description || (
          <span className="italic">No description available.</span>
        )}
      </p>

      <a
        href={repo.html_url}
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
