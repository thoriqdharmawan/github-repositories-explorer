import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthProvider";
import { getAuthUser, isAuthenticated } from "@/utils";

jest.mock("@/utils", () => ({
  getAuthUser: jest.fn(),
  isAuthenticated: jest.fn(),
}));

const mockGetAuthUser = getAuthUser as jest.MockedFunction<typeof getAuthUser>;
const mockIsAuthenticated = isAuthenticated as jest.MockedFunction<
  typeof isAuthenticated
>;

const TestComponent = () => {
  const { authenticated, user, loading, refreshAuth } = useAuth();
  return (
    <div>
      <div data-testid="authenticated">{authenticated.toString()}</div>
      <div data-testid="user">{JSON.stringify(user)}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <button onClick={refreshAuth} data-testid="refresh">
        Refresh
      </button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should provide initial auth state", async () => {
    mockIsAuthenticated.mockReturnValue(false);
    mockGetAuthUser.mockReturnValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("user")).toHaveTextContent("null");
  });

  it("should provide authenticated state when user is logged in", async () => {
    const mockUser = { login: "testuser", id: 123 };
    mockIsAuthenticated.mockReturnValue(true);
    mockGetAuthUser.mockReturnValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(screen.getByTestId("user")).toHaveTextContent(
      JSON.stringify(mockUser),
    );
  });

  it("should refresh auth state when refreshAuth is called", async () => {
    mockIsAuthenticated.mockReturnValue(false);
    mockGetAuthUser.mockReturnValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    mockIsAuthenticated.mockReturnValue(true);
    mockGetAuthUser.mockReturnValue({ login: "newuser" });

    act(() => {
      screen.getByTestId("refresh").click();
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(screen.getByTestId("user")).toHaveTextContent('{"login":"newuser"}');
  });

  it("should set up storage event listeners", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(window.addEventListener).toHaveBeenCalledWith(
      "storage",
      expect.any(Function),
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "auth-changed",
      expect.any(Function),
    );
  });

  it("should handle storage events for relevant keys", async () => {
    mockIsAuthenticated.mockReturnValue(false);
    mockGetAuthUser.mockReturnValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    const storageHandler = (
      window.addEventListener as jest.Mock
    ).mock.calls.find((call) => call[0] === "storage")[1];

    mockIsAuthenticated.mockReturnValue(true);
    mockGetAuthUser.mockReturnValue({ login: "storageuser" });

    act(() => {
      storageHandler({ key: "github_access_token" });
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
  });

  it("should handle auth-changed events", async () => {
    mockIsAuthenticated.mockReturnValue(false);
    mockGetAuthUser.mockReturnValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    const authHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === "auth-changed",
    )[1];

    mockIsAuthenticated.mockReturnValue(true);
    mockGetAuthUser.mockReturnValue({ login: "authuser" });

    act(() => {
      authHandler();
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
  });

  it("should throw error when useAuth is used outside AuthProvider", () => {
    const ConsoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAuth must be used within an AuthProvider");

    console.error = ConsoleError;
  });
});
