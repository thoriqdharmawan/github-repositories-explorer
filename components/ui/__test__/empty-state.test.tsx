import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "../empty-state";

describe("EmptyState Component", () => {
  it("renders with required title prop", () => {
    render(<EmptyState title="No data found" />);

    const title = screen.getByText("No data found");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      "text-lg",
      "font-semibold",
      "tracking-tight",
      "text-foreground",
    );
  });

  it("applies default variant classes correctly", () => {
    render(<EmptyState title="Test" data-testid="empty-state" />);

    const container = screen.getByTestId("empty-state");
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-center",
      "space-y-4",
      "py-12",
      "px-6",
    );
  });

  it("renders with description when provided", () => {
    const description = "Try adjusting your search or filter criteria";
    render(<EmptyState title="No results" description={description} />);

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass(
      "text-sm",
      "text-muted-foreground",
      "max-w-sm",
    );
  });

  it("does not render description when not provided", () => {
    render(<EmptyState title="No results" />);

    // Should only have the title, no description paragraph
    const paragraphs = screen.queryAllByRole("paragraph");
    expect(paragraphs).toHaveLength(0);
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <svg data-testid="test-icon" />;

    render(<EmptyState title="No data" icon={<TestIcon />} />);

    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();

    // Check icon container classes
    const iconContainer = icon.closest("div");
    expect(iconContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "w-16",
      "h-16",
      "mx-auto",
      "mb-4",
      "rounded-full",
      "bg-muted",
    );
  });

  it("does not render icon container when icon is not provided", () => {
    render(<EmptyState title="No data" data-testid="empty-state" />);

    const container = screen.getByTestId("empty-state");
    const iconContainer = container.querySelector(".w-16.h-16");
    expect(iconContainer).not.toBeInTheDocument();
  });

  it("renders action when provided", () => {
    const ActionButton = () => <button>Try again</button>;

    render(<EmptyState title="Error occurred" action={<ActionButton />} />);

    const button = screen.getByText("Try again");
    expect(button).toBeInTheDocument();

    // Check action container has correct padding
    const actionContainer = button.closest("div");
    expect(actionContainer).toHaveClass("pt-2");
  });

  it("does not render action container when action is not provided", () => {
    render(<EmptyState title="No data" data-testid="empty-state" />);

    const container = screen.getByTestId("empty-state");
    const actionContainer = container.querySelector(".pt-2");
    expect(actionContainer).not.toBeInTheDocument();
  });

  it("applies small size variant correctly", () => {
    render(
      <EmptyState title="Small state" size="sm" data-testid="empty-state" />,
    );

    const container = screen.getByTestId("empty-state");
    expect(container).toHaveClass("py-8", "px-4", "space-y-3");
  });

  it("applies large size variant correctly", () => {
    render(
      <EmptyState title="Large state" size="lg" data-testid="empty-state" />,
    );

    const container = screen.getByTestId("empty-state");
    expect(container).toHaveClass("py-16", "px-8", "space-y-6");
  });

  it("accepts and applies custom className", () => {
    const customClass = "bg-red-100 border-2";
    render(
      <EmptyState
        title="Custom style"
        className={customClass}
        data-testid="empty-state"
      />,
    );

    const container = screen.getByTestId("empty-state");
    expect(container).toHaveClass("bg-red-100", "border-2");
    // Should also maintain default classes
    expect(container).toHaveClass("flex", "flex-col", "items-center");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<EmptyState title="Ref test" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveTextContent("Ref test");
  });

  it("spreads additional HTML attributes correctly", () => {
    render(
      <EmptyState
        title="Attributes test"
        data-testid="custom-empty-state"
        role="region"
        aria-label="Empty state message"
        id="empty-state-id"
      />,
    );

    const container = screen.getByTestId("custom-empty-state");
    expect(container).toHaveAttribute("role", "region");
    expect(container).toHaveAttribute("aria-label", "Empty state message");
    expect(container).toHaveAttribute("id", "empty-state-id");
  });

  it("renders complete empty state with all props", () => {
    const TestIcon = () => <svg data-testid="complete-icon" />;
    const ActionButton = () => (
      <button data-testid="complete-action">Reload</button>
    );

    render(
      <EmptyState
        title="Complete Example"
        description="This is a complete empty state with all props"
        icon={<TestIcon />}
        action={<ActionButton />}
        size="lg"
        className="custom-empty-state"
        data-testid="complete-empty-state"
      />,
    );

    // Check all elements are present
    expect(screen.getByTestId("complete-icon")).toBeInTheDocument();
    expect(screen.getByText("Complete Example")).toBeInTheDocument();
    expect(
      screen.getByText("This is a complete empty state with all props"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("complete-action")).toBeInTheDocument();

    // Check container has correct classes
    const container = screen.getByTestId("complete-empty-state");
    expect(container).toHaveClass(
      "py-16",
      "px-8",
      "space-y-6",
      "custom-empty-state",
    );
  });

  it("has correct display name", () => {
    expect(EmptyState.displayName).toBe("EmptyState");
  });

  it("handles click events correctly", () => {
    const handleClick = jest.fn();
    render(
      <EmptyState
        title="Clickable"
        onClick={handleClick}
        data-testid="clickable-empty-state"
      />,
    );

    const container = screen.getByTestId("clickable-empty-state");
    container.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation when interactive", () => {
    const handleKeyDown = jest.fn();
    render(
      <EmptyState
        title="Keyboard test"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        data-testid="keyboard-empty-state"
      />,
    );

    const container = screen.getByTestId("keyboard-empty-state");
    expect(container).toHaveAttribute("tabIndex", "0");
  });

  it("maintains proper semantic structure", () => {
    render(
      <EmptyState
        title="Semantic Test"
        description="Testing semantic structure"
        data-testid="semantic-test"
      />,
    );

    const container = screen.getByTestId("semantic-test");

    // Title should be h3
    const title = container.querySelector("h3");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Semantic Test");

    // Description should be p
    const description = container.querySelector("p");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Testing semantic structure");
  });

  it("handles long title and description correctly", () => {
    const longTitle =
      "This is a very long title that might wrap to multiple lines in some cases";
    const longDescription =
      "This is a very long description that should handle text wrapping gracefully and maintain readability even with extensive content that goes beyond normal length expectations.";

    render(
      <EmptyState
        title={longTitle}
        description={longDescription}
        data-testid="long-content-test"
      />,
    );

    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longDescription)).toBeInTheDocument();

    // Description should have max-width constraint
    const description = screen.getByText(longDescription);
    expect(description).toHaveClass("max-w-sm");
  });

  it("works with different icon types", () => {
    const StringIcon = () => "Icon";
    const NumberIcon = () => <span>123</span>;

    // Test with string icon
    const { rerender } = render(
      <EmptyState
        title="String icon test"
        icon={<StringIcon />}
        data-testid="string-icon-test"
      />,
    );

    expect(screen.getByText("Icon")).toBeInTheDocument();

    // Test with number icon
    rerender(
      <EmptyState
        title="Number icon test"
        icon={<NumberIcon />}
        data-testid="number-icon-test"
      />,
    );

    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("supports complex action elements", () => {
    const ComplexAction = () => (
      <div className="flex gap-2">
        <button data-testid="primary-action">Primary</button>
        <button data-testid="secondary-action">Secondary</button>
      </div>
    );

    render(<EmptyState title="Complex actions" action={<ComplexAction />} />);

    expect(screen.getByTestId("primary-action")).toBeInTheDocument();
    expect(screen.getByTestId("secondary-action")).toBeInTheDocument();
  });
});
