import { useQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import type { AxiosError } from "axios";
import type { Repo } from "@/types/repos";

type Props = {
  enable: boolean;
  user: string;
  params?: {
    sort: "updated" | "created" | "pushed" | "full_name";
    per_page: number;
    page: number;
  };
};

const useGetRepos = (props?: Props) => {
  const queryFn = async () => {
    try {
      const response = await apiApp.get<Repo[]>(`/users/${props?.user}/repos`, {
        params: {
          sort: props?.params?.sort || "updated",
          per_page: props?.params?.per_page,
          page: props?.params?.page,
        },
      });

      return response.data;
    } catch (error: unknown) {
      const e = error as AxiosError<null>;
      throw new Error(e?.response?.data || "Failed to fetch repositories");
    }
  };

  const query = useQuery({
    queryKey: ["list-repos", props?.params],
    queryFn,
    enabled: props?.enable ?? true,
  });

  return query;
};
export default useGetRepos;
