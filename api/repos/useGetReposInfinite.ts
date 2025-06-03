import { useInfiniteQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import type { AxiosError } from "axios";
import type { Repo } from "@/types/repos";

type Props = {
  enable: boolean;
  user: string;
  params?: {
    sort: "updated" | "created" | "pushed" | "full_name";
    per_page: number;
  };
};

const useGetReposInfinite = (props?: Props) => {
  const queryFn = async ({ pageParam = 1 }: { pageParam: number }) => {
    try {
      const response = await apiApp.get<Repo[]>(`/users/${props?.user}/repos`, {
        params: {
          sort: props?.params?.sort || "updated",
          per_page: props?.params?.per_page || 10,
          page: pageParam,
        },
      });

      return {
        data: response.data,
        nextPage: response.data.length === (props?.params?.per_page || 10) ? pageParam + 1 : undefined,
      };
    } catch (error: unknown) {
      const e = error as AxiosError<null>;
      throw new Error(e?.response?.data || "Failed to fetch repositories");
    }
  };

  const query = useInfiniteQuery({
    queryKey: ["list-repos-infinite", props?.user, props?.params],
    queryFn,
    enabled: props?.enable ?? true,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return query;
};

export default useGetReposInfinite;
