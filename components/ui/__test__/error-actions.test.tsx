import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorActions from "../error-actions";
import { githubOAuthLogin } from "@/utils";

jest.mock("@/utils", () => ({
  githubOAuthLogin: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  GitBranch: ({ className }: { className?: string }) => (
    <div data-testid="git-branch-icon" className={className} />
  ),
  RefreshCw: ({ className }: { className?: string }) => (
    <div data-testid="refresh-icon" className={className} />
  ),
}));

describe("ErrorActions", () => {
  const mockOnRetry = jest.fn();
  const mockOnOAuthLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when isRateLimitError is false", () => {
    it("renders only retry button with default label", () => {
      render(<ErrorActions onRetry={mockOnRetry} />);

      expect(
        screen.getByRole("button", { name: /try again/i }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /login with github/i }),
      ).not.toBeInTheDocument();
    });

    it("renders retry button with custom label", () => {
      render(<ErrorActions onRetry={mockOnRetry} retryLabel="Retry Now" />);

      expect(
        screen.getByRole("button", { name: /retry now/i }),
      ).toBeInTheDocument();
    });

    it("calls onRetry when retry button is clicked", () => {
      render(<ErrorActions onRetry={mockOnRetry} />);

      fireEvent.click(screen.getByRole("button", { name: /try again/i }));
      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it("applies custom className", () => {
      render(<ErrorActions onRetry={mockOnRetry} className="custom-class" />);

      const button = screen.getByRole("button", { name: /try again/i });
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("when isRateLimitError is true", () => {
    it("renders both login and retry buttons with default labels", () => {
      render(<ErrorActions onRetry={mockOnRetry} isRateLimitError={true} />);

      expect(
        screen.getByRole("button", { name: /login with github/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /try again/i }),
      ).toBeInTheDocument();
    });

    it("renders buttons with custom labels", () => {
      render(
        <ErrorActions
          onRetry={mockOnRetry}
          isRateLimitError={true}
          retryLabel="Retry Request"
          loginLabel="Authenticate"
        />,
      );

      expect(
        screen.getByRole("button", { name: /authenticate/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /retry request/i }),
      ).toBeInTheDocument();
    });

    it("calls onRetry when retry button is clicked", () => {
      render(<ErrorActions onRetry={mockOnRetry} isRateLimitError={true} />);

      fireEvent.click(screen.getByRole("button", { name: /try again/i }));
      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it("calls githubOAuthLogin when login button is clicked and no onOAuthLogin provided", () => {
      render(<ErrorActions onRetry={mockOnRetry} isRateLimitError={true} />);

      fireEvent.click(
        screen.getByRole("button", { name: /login with github/i }),
      );
      expect(githubOAuthLogin).toHaveBeenCalledTimes(1);
    });

    it("calls custom onOAuthLogin when provided", () => {
      render(
        <ErrorActions
          onRetry={mockOnRetry}
          isRateLimitError={true}
          onOAuthLogin={mockOnOAuthLogin}
        />,
      );

      fireEvent.click(
        screen.getByRole("button", { name: /login with github/i }),
      );
      expect(mockOnOAuthLogin).toHaveBeenCalledTimes(1);
      expect(githubOAuthLogin).not.toHaveBeenCalled();
    });

    it("applies custom className to container div", () => {
      const { container } = render(
        <ErrorActions
          onRetry={mockOnRetry}
          isRateLimitError={true}
          className="custom-container-class"
        />,
      );

      const div = container.querySelector("div");
      expect(div).toHaveClass("custom-container-class");
    });

    it("renders correct icons for both buttons", () => {
      render(<ErrorActions onRetry={mockOnRetry} isRateLimitError={true} />);

      expect(screen.getByTestId("git-branch-icon")).toBeInTheDocument();
      expect(screen.getByTestId("refresh-icon")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("retry button has proper accessibility attributes", () => {
      render(<ErrorActions onRetry={mockOnRetry} />);

      const button = screen.getByRole("button", { name: /try again/i });
      expect(button).toBeEnabled();
    });

    it("both buttons are accessible when rate limit error", () => {
      render(<ErrorActions onRetry={mockOnRetry} isRateLimitError={true} />);

      const loginButton = screen.getByRole("button", {
        name: /login with github/i,
      });
      const retryButton = screen.getByRole("button", { name: /try again/i });

      expect(loginButton).toBeEnabled();
      expect(retryButton).toBeEnabled();
    });
  });
});
