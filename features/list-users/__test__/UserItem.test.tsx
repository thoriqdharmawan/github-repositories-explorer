import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserItem from "../UserItem";
import { User } from "@/types/users";

jest.mock("../../list-repos", () => {
  return function MockListRepos() {
    return <div data-testid="list-repos">Mock ListRepos</div>;
  };
});

jest.mock("@/components/ui/accordion", () => ({
  AccordionItem: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: string;
  }) => (
    <div data-testid="accordion-item" data-value={value}>
      {children}
    </div>
  ),
  AccordionTrigger: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="accordion-trigger" className={className}>
      {children}
    </div>
  ),
  AccordionContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion-content">{children}</div>
  ),
}));

const mockUser: User = {
  id: 123,
  login: "testuser",
  avatar_url: "https://example.com/avatar.jpg",
  html_url: "https://github.com/testuser",
  site_admin: false,
  type: "User",
  node_id: "MDQ6VXNlcjU3NjcyNzEw",
  gravatar_id: "",
  url: "https://api.github.com/users/thoriqdharmawan",
  followers_url: "https://api.github.com/users/thoriqdharmawan/followers",
  following_url:
    "https://api.github.com/users/thoriqdharmawan/following{/other_user}",
  gists_url: "https://api.github.com/users/thoriqdharmawan/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/thoriqdharmawan/starred{/owner}{/repo}",
  subscriptions_url:
    "https://api.github.com/users/thoriqdharmawan/subscriptions",
  organizations_url: "https://api.github.com/users/thoriqdharmawan/orgs",
  repos_url: "https://api.github.com/users/thoriqdharmawan/repos",
  events_url: "https://api.github.com/users/thoriqdharmawan/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/thoriqdharmawan/received_events",
  user_view_type: "public",
};

const mockAdminUser: User = {
  ...mockUser,
  site_admin: true,
  type: "Organization",
};

describe("UserItem", () => {
  it("renders user information correctly", () => {
    render(<UserItem user={mockUser} />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("ID: 123")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByAltText("testuser")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
  });

  it("displays admin badge when user is site admin", () => {
    render(<UserItem user={mockAdminUser} />);

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("does not display admin badge when user is not site admin", () => {
    render(<UserItem user={mockUser} />);

    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  it("renders profile link with correct attributes", () => {
    render(<UserItem user={mockUser} />);

    const profileLink = screen.getByText("View Profile");
    expect(profileLink).toHaveAttribute("href", "https://github.com/testuser");
    expect(profileLink).toHaveAttribute("target", "_blank");
    expect(profileLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("calls onViewDetails when Details button is clicked", () => {
    const mockOnViewDetails = jest.fn();
    render(<UserItem user={mockUser} onViewDetails={mockOnViewDetails} />);

    const detailsButton = screen.getByText("Details");
    fireEvent.click(detailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockUser);
  });

  it("does not call onViewDetails when not provided", () => {
    render(<UserItem user={mockUser} />);

    const detailsButton = screen.getByText("Details");
    expect(() => fireEvent.click(detailsButton)).not.toThrow();
  });

  it("stops propagation when Details button is clicked", () => {
    const mockOnViewDetails = jest.fn();
    const mockStopPropagation = jest.fn();

    render(<UserItem user={mockUser} onViewDetails={mockOnViewDetails} />);

    const detailsButton = screen.getByText("Details");
    fireEvent.click(detailsButton, { stopPropagation: mockStopPropagation });

    expect(mockOnViewDetails).toHaveBeenCalled();
  });

  it("stops propagation when profile link is clicked", () => {
    const mockStopPropagation = jest.fn();

    render(<UserItem user={mockUser} />);

    const profileLink = screen.getByText("View Profile");
    fireEvent.click(profileLink, { stopPropagation: mockStopPropagation });
  });

  it("renders ListRepos component in accordion content", () => {
    render(<UserItem user={mockUser} />);

    expect(screen.getByTestId("list-repos")).toBeInTheDocument();
  });

  it("sets correct accordion item value", () => {
    render(<UserItem user={mockUser} />);

    const accordionItem = screen.getByTestId("accordion-item");
    expect(accordionItem).toHaveAttribute("data-value", "123");
  });
});
