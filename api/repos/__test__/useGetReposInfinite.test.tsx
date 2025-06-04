import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiApp } from "../../apiApp";
import useGetReposInfinite from "../useGetReposInfinite";
import type { Repo } from "@/types/repos";

jest.mock("../../apiApp");
const mockedApiApp = apiApp as jest.Mocked<typeof apiApp>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockRepos: Repo[] = [
  { id: 1, name: "repo1", full_name: "user/repo1" } as Repo,
  { id: 2, name: "repo2", full_name: "user/repo2" } as Repo,
];

describe("useGetReposInfinite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch repositories successfully", async () => {
    mockedApiApp.get.mockResolvedValueOnce({
      data: mockRepos,
    });

    const { result } = renderHook(
      () => useGetReposInfinite({ enable: true, user: "testuser" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedApiApp.get).toHaveBeenCalledWith("/users/testuser/repos", {
      params: {
        sort: "updated",
        per_page: 10,
        page: 1,
      },
    });
    expect(result.current.data?.pages[0].data).toEqual(mockRepos);
  });

  it("should handle custom params", async () => {
    mockedApiApp.get.mockResolvedValueOnce({
      data: mockRepos,
    });

    const { result } = renderHook(
      () =>
        useGetReposInfinite({
          enable: true,
          user: "testuser",
          params: { sort: "created", per_page: 5 },
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedApiApp.get).toHaveBeenCalledWith("/users/testuser/repos", {
      params: {
        sort: "created",
        per_page: 5,
        page: 1,
      },
    });
  });

  it("should be disabled when enable is false", () => {
    const { result } = renderHook(
      () => useGetReposInfinite({ enable: false, user: "testuser" }),
      { wrapper: createWrapper() },
    );

    expect(result.current.isFetching).toBe(false);
    expect(mockedApiApp.get).not.toHaveBeenCalled();
  });

  it("should handle API errors with message", async () => {
    const errorMessage = "Not Found";
    mockedApiApp.get.mockRejectedValueOnce({
      response: {
        data: { message: errorMessage },
      },
    });

    const { result } = renderHook(
      () => useGetReposInfinite({ enable: true, user: "testuser" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it("should handle generic API errors", async () => {
    mockedApiApp.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(
      () => useGetReposInfinite({ enable: true, user: "testuser" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Failed to fetch repositories");
  });

  it("should determine next page correctly", async () => {
    const fullPageRepos = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        name: `repo${i + 1}`,
        full_name: `user/repo${i + 1}`,
      })) as Repo[];

    mockedApiApp.get.mockResolvedValueOnce({
      data: fullPageRepos,
    });

    const { result } = renderHook(
      () => useGetReposInfinite({ enable: true, user: "testuser" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0].nextPage).toBe(2);
  });

  it("should not have next page when data length is less than per_page", async () => {
    const partialPageRepos = mockRepos.slice(0, 1);
    mockedApiApp.get.mockResolvedValueOnce({
      data: partialPageRepos,
    });

    const { result } = renderHook(
      () => useGetReposInfinite({ enable: true, user: "testuser" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0].nextPage).toBeUndefined();
  });
});
