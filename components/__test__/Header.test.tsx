import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "../Header";
import { useAuth } from "@/providers/AuthProvider";
import { githubOAuthLogin, logout } from "@/utils";

jest.mock("@/providers/AuthProvider");
jest.mock("@/utils");
jest.mock("../ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));
jest.mock("../ModeToggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

const mockUseAuth = useAuth as jest.MockedFunction<any>;
const mockGithubOAuthLogin = githubOAuthLogin as jest.MockedFunction<any>;
const mockLogout = logout as jest.MockedFunction<typeof logout>;

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header with title and description", () => {
    mockUseAuth.mockReturnValue({
      authenticated: false,
      user: null,
    });

    render(<Header />);

    expect(
      screen.getByText("GitHub Repositories Explorer"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Discover and explore GitHub users and their repositories",
      ),
    ).toBeInTheDocument();
  });

  it("renders login button when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      authenticated: false,
      user: null,
    });

    render(<Header />);

    const loginButton = screen.getByRole("button", {
      name: /login with github/i,
    });
    expect(loginButton).toBeInTheDocument();
  });

  it("calls githubOAuthLogin when login button is clicked", () => {
    mockUseAuth.mockReturnValue({
      authenticated: false,
      user: null,
    });

    render(<Header />);

    const loginButton = screen.getByRole("button", {
      name: /login with github/i,
    });
    fireEvent.click(loginButton);

    expect(mockGithubOAuthLogin).toHaveBeenCalledTimes(1);
  });

  it("renders user info and logout button when user is authenticated", () => {
    const mockUser = {
      name: "John Doe",
      login: "johndoe",
    };

    mockUseAuth.mockReturnValue({
      authenticated: true,
      user: mockUser,
    });

    render(<Header />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("displays user login when name is not available", () => {
    const mockUser = {
      name: null,
      login: "johndoe",
    };

    mockUseAuth.mockReturnValue({
      authenticated: true,
      user: mockUser,
    });

    render(<Header />);

    expect(screen.getByText("johndoe")).toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    const mockUser = {
      name: "John Doe",
      login: "johndoe",
    };

    mockUseAuth.mockReturnValue({
      authenticated: true,
      user: mockUser,
    });

    render(<Header />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("renders ModeToggle component", () => {
    mockUseAuth.mockReturnValue({
      authenticated: false,
      user: null,
    });

    render(<Header />);

    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });

  it("does not render logout button when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      authenticated: false,
      user: null,
    });

    render(<Header />);

    expect(
      screen.queryByRole("button", { name: /logout/i }),
    ).not.toBeInTheDocument();
  });

  it("does not render login button when user is authenticated", () => {
    const mockUser = {
      name: "John Doe",
      login: "johndoe",
    };

    mockUseAuth.mockReturnValue({
      authenticated: true,
      user: mockUser,
    });

    render(<Header />);

    expect(
      screen.queryByRole("button", { name: /login with github/i }),
    ).not.toBeInTheDocument();
  });
});
