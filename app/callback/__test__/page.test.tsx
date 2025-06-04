import { render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import CallbackPage from "../page";
import { setAuthData } from "@/utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/utils", () => ({
  setAuthData: jest.fn(),
}));

global.fetch = jest.fn();

describe("CallbackPage", () => {
  const mockPush = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("handles error parameter in URL", async () => {
    mockGet.mockImplementation((param) => {
      if (param === "error") return "access_denied";
      return null;
    });

    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Login Failed")).toBeInTheDocument();
      expect(
        screen.getByText("Authorization was denied or cancelled"),
      ).toBeInTheDocument();
    });
  });

  it("handles missing authorization code", async () => {
    mockGet.mockReturnValue(null);

    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Login Failed")).toBeInTheDocument();
      expect(
        screen.getByText("No authorization code received"),
      ).toBeInTheDocument();
    });
  });

  it("handles successful OAuth flow", async () => {
    const mockCode = "test-code";
    const mockToken = "test-token";
    const mockUser = { name: "Test User", login: "testuser" };

    mockGet.mockImplementation((param) => {
      if (param === "code") return mockCode;
      return null;
    });

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: mockToken }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Login Successful!")).toBeInTheDocument();
      expect(screen.getByText("Welcome, Test User!")).toBeInTheDocument();
    });

    expect(setAuthData).toHaveBeenCalledWith(mockToken, mockUser);
  });

  it("handles token exchange failure", async () => {
    const mockCode = "test-code";

    mockGet.mockImplementation((param) => {
      if (param === "code") return mockCode;
      return null;
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Login Failed")).toBeInTheDocument();
      expect(
        screen.getByText("Failed to exchange code for token"),
      ).toBeInTheDocument();
    });
  });

  it("handles user fetch failure", async () => {
    const mockCode = "test-code";
    const mockToken = "test-token";

    mockGet.mockImplementation((param) => {
      if (param === "code") return mockCode;
      return null;
    });

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: mockToken }),
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Login Failed")).toBeInTheDocument();
      expect(
        screen.getByText("Failed to fetch user information"),
      ).toBeInTheDocument();
    });
  });

  it("redirects to home after successful login", async () => {
    const mockCode = "test-code";
    const mockToken = "test-token";
    const mockUser = { name: "Test User", login: "testuser" };

    mockGet.mockImplementation((param) => {
      if (param === "code") return mockCode;
      return null;
    });

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: mockToken }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

    jest.useFakeTimers();
    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Login Successful!")).toBeInTheDocument();
    });

    jest.advanceTimersByTime(2000);

    expect(mockPush).toHaveBeenCalledWith("/");

    jest.useRealTimers();
  });

  it("uses login as fallback when name is not available", async () => {
    const mockCode = "test-code";
    const mockToken = "test-token";
    const mockUser = { login: "testuser" };

    mockGet.mockImplementation((param) => {
      if (param === "code") return mockCode;
      return null;
    });

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: mockToken }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

    render(<CallbackPage />);

    await waitFor(() => {
      expect(screen.getByText("Welcome, testuser!")).toBeInTheDocument();
    });
  });
});
