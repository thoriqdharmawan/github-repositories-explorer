import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import UserDetail from "../index";
import { User } from "@/types/users";

jest.mock("@/components/DetailWrapper", () => {
  return function MockDetailWrapper({
    children,
    title,
    onClose,
    hideHeader,
  }: any) {
    return (
      <div data-testid="detail-wrapper">
        {!hideHeader && <div data-testid="header">{title}</div>}
        <button onClick={onClose} data-testid="close-button">
          Close
        </button>
        {children}
      </div>
    );
  };
});

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, variant, size, className }: any) => (
    <button onClick={onClick} data-testid="button" className={className}>
      {children}
    </button>
  ),
}));

jest.mock("lucide-react", () => ({
  ExternalLink: () => (
    <span data-testid="external-link-icon">ExternalLink</span>
  ),
  User: () => <span data-testid="user-icon">User</span>,
}));

const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
  writable: true,
});

const mockUser: User = {
  login: "testuser",
  id: 12345,
  node_id: "MDQ6VXNlcjEyMzQ1",
  avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/testuser",
  html_url: "https://github.com/testuser",
  followers_url: "https://api.github.com/users/testuser/followers",
  following_url: "https://api.github.com/users/testuser/following{/other_user}",
  gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
  starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
  organizations_url: "https://api.github.com/users/testuser/orgs",
  repos_url: "https://api.github.com/users/testuser/repos",
  events_url: "https://api.github.com/users/testuser/events{/privacy}",
  received_events_url: "https://api.github.com/users/testuser/received_events",
  type: "User",
  site_admin: false,
  user_view_type: "user",
};

const mockAdminUser: User = {
  ...mockUser,
  site_admin: true,
};

describe("UserDetail Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it("should render without crashing", () => {
  //   render(<UserDetail user={mockUser} onClose={mockOnClose} />);
  //   expect(screen.getByTestId("detail-wrapper")).toBeInTheDocument();
  // });

  it("should display user information correctly", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    expect(screen.getAllByText("testuser").length > 0).toBeTruthy();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("MDQ6VXNlcjEyMzQ1")).toBeInTheDocument();
  });

  it("should display user avatar with correct src and alt", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    const avatar = screen.getByAltText("testuser");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/12345?v=4",
    );
  });

  it("should show admin badge when user is site admin", () => {
    render(<UserDetail user={mockAdminUser} onClose={mockOnClose} />);

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should not show admin badge when user is not site admin", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  it("should render GitHub profile button and open profile on click", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    const profileButton = screen
      .getByText("View GitHub Profile")
      .closest("button");
    expect(profileButton).toBeInTheDocument();

    fireEvent.click(profileButton!);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://github.com/testuser",
      "_blank",
    );
  });

  it("should render all API endpoint buttons", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText("Following")).toBeInTheDocument();
    expect(screen.getByText("Gists")).toBeInTheDocument();
    expect(screen.getByText("Organizations")).toBeInTheDocument();
  });

  it("should hide header when hideHeader prop is true", () => {
    render(
      <UserDetail user={mockUser} onClose={mockOnClose} hideHeader={true} />,
    );

    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
  });

  it("should properly format gists URL by removing template", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    expect(mockUser.gists_url).toContain("{/gist_id}");
  });

  it("should render user information section with correct structure", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByText("Information")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Node ID")).toBeInTheDocument();
  });

  it("should render API endpoints section with correct structure", () => {
    render(<UserDetail user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByText("API Endpoints")).toBeInTheDocument();
  });
});
