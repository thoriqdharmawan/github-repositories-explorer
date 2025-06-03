import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "../error-state";

describe("ErrorState", () => {
  it("renders with default props", () => {
    render(<ErrorState />);

    const errorState = screen.getByRole("alert");
    expect(errorState).toBeInTheDocument();
    expect(errorState).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
    );
  });

  it("renders with title and description", () => {
    render(
      <ErrorState
        title="Something went wrong"
        description="Please try again later"
      />,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Please try again later")).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;

    render(<ErrorState icon={<CustomIcon />} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders default AlertCircle icon when no custom icon provided", () => {
    render(<ErrorState />);

    const alertIcon = document.querySelector("svg");
    expect(alertIcon).toBeInTheDocument();
  });

  it("renders with action button", () => {
    const ActionButton = () => <button>Retry</button>;

    render(<ErrorState action={<ActionButton />} />);

    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("applies size variants correctly", () => {
    const { rerender } = render(<ErrorState size="sm" />);
    let container = screen.getByRole("alert");
    expect(container).toHaveClass("py-8", "px-4", "space-y-3");

    rerender(<ErrorState size="lg" />);
    container = screen.getByRole("alert");
    expect(container).toHaveClass("py-16", "px-8", "space-y-6");
  });

  it("applies custom className", () => {
    render(<ErrorState className="custom-class" />);

    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("applies icon size variants", () => {
    render(<ErrorState iconSize="lg" />);

    const alertIcon = document.querySelector("svg");
    expect(alertIcon).toHaveClass("h-12", "w-12");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ErrorState ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through additional props", () => {
    render(<ErrorState data-testid="error-state" aria-label="Error message" />);

    const errorState = screen.getByTestId("error-state");
    expect(errorState).toHaveAttribute("aria-label", "Error message");
  });

  it("renders complete error state with all props", () => {
    const ActionButton = () => <button>Try Again</button>;
    const CustomIcon = () => <div data-testid="custom-icon">!</div>;

    render(
      <ErrorState
        title="Network Error"
        description="Failed to load data"
        icon={<CustomIcon />}
        action={<ActionButton />}
        size="lg"
        className="rounded border"
      />,
    );

    expect(screen.getByText("Network Error")).toBeInTheDocument();
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass(
      "border",
      "rounded",
      "py-16",
      "px-8",
    );
  });
});
