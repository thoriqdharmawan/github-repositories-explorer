import { Repo } from "@/types/repos";
import { BookMarked, Star } from "lucide-react";
import { FC } from "react";

interface RepoItem {
  repo: Repo;
}

const RepoItem: FC<RepoItem> = ({ repo }) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <BookMarked />
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <h3 className="text-lg font-semibold text-gray-900 hover:underline">
              {repo.name || "Unknown Repository"}
            </h3>
          </a>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <p>{repo.stargazers_count}</p>
          <Star size={16} />
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {repo.description || (
          <span className="italic">No description available.</span>
        )}
      </p>
    </div>
  );
};

export default RepoItem;
