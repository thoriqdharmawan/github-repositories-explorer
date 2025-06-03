import { User } from "@/types/users";
import { FC } from "react";

interface ListReposProps {
  data: User;
}

const ListRepos: FC<ListReposProps> = ({ data }) => {
  return (
    <div>
      <h1>List Repositories</h1>
      <p>This feature will list repositories.</p>

      <p>
        user id: {data.id} - {data.login}
      </p>
    </div>
  );
};

export default ListRepos;
