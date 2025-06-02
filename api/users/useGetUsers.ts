import { useQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import type { AxiosError } from "axios";
import { ApiResponseInterface } from "@/types/ApiResponse";
import { User } from "@/types/users";

type Props = {
  params?: {
    q?: string;
    per_page: number;
    page: number;
  };
};

const useGetUsers = (props?: Props) => {
  const queryFn = async () => {
    try {
      const response = await apiApp.get<ApiResponseInterface<User[]>>(
        "/users",
        { params: props?.params },
      );

      return response.data;
    } catch (error: unknown) {
      const e = error as AxiosError<ApiResponseInterface<null>>;
      throw new Error("Failed to fetch users: ");
    }
  };

  const query = useQuery({
    queryKey: ["list-user", props?.params],
    queryFn,
  });

  return query;
};
export default useGetUsers;
