import { useQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import type { AxiosError } from "axios";
import { User } from "@/types/users";
import { ApiResponseInterface } from "@/types/ApiResponse";

type Props = {
  enable: boolean;
  params?: {
    q: string;
    per_page: number;
    page: number;
  };
};

const useGetUsers = (props?: Props) => {
  const queryFn = async () => {
    try {
      const response = await apiApp.get<ApiResponseInterface<User>>(
        "/search/users",
        {
          params: {
            per_page: props?.params?.per_page,
            page: props?.params?.page,
            ...(props?.params?.q && { q: props.params.q }),
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      const e = error as AxiosError<{ message: string; documentation_url?: string }>;
      if (e?.response?.data?.message) {
        throw new Error(e.response.data.message);
      }
      throw new Error("Failed to fetch users");
    }
  };

  const query = useQuery({
    queryKey: ["list-user", props?.params],
    queryFn,
    enabled: props?.enable ?? true,
  });

  return query;
};
export default useGetUsers;
