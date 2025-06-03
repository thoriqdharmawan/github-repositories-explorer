import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingState } from "../loading-state";

jest.mock("lucide-react", () => ({
  Loader2: ({ className }: { className?: string }) => (
    <div data-testid="loader" className={className} />
  ),
}));

jest.mock("@/lib/utils", () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(" "),
}));

describe("LoadingState", () => {
  it("renders with default props", () => {
    render(<LoadingState />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<LoadingState title="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<LoadingState description="Please wait while we load your data" />);
    expect(
      screen.getByText("Please wait while we load your data"),
    ).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
    render(<LoadingState icon={customIcon} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<LoadingState size="sm" />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    rerender(<LoadingState size="lg" />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders with custom spinner size", () => {
    render(<LoadingState spinnerSize="lg" />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <LoadingState className="custom-class" data-testid="loading-state" />,
    );
    expect(screen.getByTestId("loading-state")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LoadingState ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through additional props", () => {
    render(
      <LoadingState data-testid="loading-state" aria-label="Loading content" />,
    );
    const element = screen.getByTestId("loading-state");
    expect(element).toHaveAttribute("aria-label", "Loading content");
  });

  it("renders complete loading state with all props", () => {
    render(
      <LoadingState
        title="Loading Data"
        description="Fetching your repositories..."
        size="lg"
        spinnerSize="sm"
        data-testid="complete-loading"
      />,
    );

    expect(screen.getByText("Loading Data")).toBeInTheDocument();
    expect(
      screen.getByText("Fetching your repositories..."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByTestId("complete-loading")).toBeInTheDocument();
  });
});
