import useGetRepos from "@/api/repos/useGetRepos";
import { User } from "@/types/users";
import { FC } from "react";

interface ListReposProps {
  user: User;
}

const ListRepos: FC<ListReposProps> = ({ user }) => {
  const { data, isError, isLoading } = useGetRepos({
    enable: !!user.login,
    user: user.login,
    params: {
      sort: "updated",
      per_page: 5,
      page: 1,
    },
  });

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Repositories</h2>
      {isLoading && <p>Loading repositories...</p>}
      {isError && <p>Error loading repositories.</p>}
      {data && data.length === 0 && <p>No repositories found.</p>}
      {data && data.length > 0 && (
        <ul className="list-disc pl-5">
          {data.map((repo) => (
            <li key={repo.id} className="mb-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListRepos;
