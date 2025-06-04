import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiApp } from "../../apiApp";
import useGetUsers from "../useGetUsers";
import { AxiosError } from "axios";
import { User } from "@/types/users";

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

const mockUsers: User[] = [
  {
    id: 1,
    login: "user1",
    avatar_url: "https://example.com/avatar1.jpg",
  } as User,
  {
    id: 2,
    login: "user2",
    avatar_url: "https://example.com/avatar2.jpg",
  } as User,
];

describe("useGetUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users successfully", async () => {
    const mockResponse = {
      data: {
        items: mockUsers,
        total_count: 2,
      },
    };

    mockedApiApp.get.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(
      () =>
        useGetUsers({
          enable: true,
          params: { q: "test", per_page: 10, page: 1 },
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedApiApp.get).toHaveBeenCalledWith("/search/users", {
      params: {
        per_page: 10,
        page: 1,
        q: "test",
      },
    });
    expect(result.current.data).toEqual(mockResponse.data);
  });

  it("should handle API error with message", async () => {
    const errorResponse = {
      response: {
        data: {
          message: "API rate limit exceeded",
        },
      },
    } as AxiosError;

    mockedApiApp.get.mockRejectedValueOnce(errorResponse);

    const { result } = renderHook(
      () =>
        useGetUsers({
          enable: true,
          params: { q: "test", per_page: 10, page: 1 },
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(new Error("API rate limit exceeded"));
  });

  it("should handle generic error", async () => {
    const genericError = new Error("Network error");
    mockedApiApp.get.mockRejectedValueOnce(genericError);

    const { result } = renderHook(
      () =>
        useGetUsers({
          enable: true,
          params: { q: "test", per_page: 10, page: 1 },
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(new Error("Failed to fetch users"));
  });

  it("should not fetch when disabled", () => {
    const { result } = renderHook(
      () =>
        useGetUsers({
          enable: false,
          params: { q: "test", per_page: 10, page: 1 },
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.isFetching).toBe(false);
    expect(mockedApiApp.get).not.toHaveBeenCalled();
  });

  it("should omit q parameter when not provided", async () => {
    const mockResponse = { data: { items: [], total_count: 0 } };
    mockedApiApp.get.mockResolvedValueOnce(mockResponse);

    renderHook(
      () =>
        useGetUsers({ enable: true, params: { q: "", per_page: 10, page: 1 } }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(mockedApiApp.get).toHaveBeenCalledWith("/search/users", {
        params: {
          per_page: 10,
          page: 1,
        },
      });
    });
  });

  it("should work with default props", async () => {
    const mockResponse = { data: { items: [], total_count: 0 } };
    mockedApiApp.get.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useGetUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedApiApp.get).toHaveBeenCalledWith("/search/users", {
      params: {
        per_page: undefined,
        page: undefined,
      },
    });
  });
});
