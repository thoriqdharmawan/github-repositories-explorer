import { render } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { QueryProvider } from "../QueryProvider";

const TestComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: () => Promise.resolve("test data"),
  });

  return (
    <div>
      <span data-testid="loading">{isLoading ? "loading" : "not loading"}</span>
      <span data-testid="data">{data || "no data"}</span>
      <span data-testid="error">{error ? "error" : "no error"}</span>
    </div>
  );
};

describe("QueryProvider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("provides QueryClient context to children", () => {
    const { getByTestId } = render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>,
    );

    expect(getByTestId("loading")).toBeInTheDocument();
    expect(getByTestId("data")).toBeInTheDocument();
    expect(getByTestId("error")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    const { getByText } = render(
      <QueryProvider>
        <div>First Child</div>
        <div>Second Child</div>
      </QueryProvider>,
    );

    expect(getByText("First Child")).toBeInTheDocument();
    expect(getByText("Second Child")).toBeInTheDocument();
  });
});
