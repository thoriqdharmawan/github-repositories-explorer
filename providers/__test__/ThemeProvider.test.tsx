import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";

jest.mock("next-themes", () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="next-themes-provider" {...props}>
      {children}
    </div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("passes props to NextThemesProvider", () => {
    const { getByTestId } = render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>Test Child</div>
      </ThemeProvider>,
    );

    const provider = getByTestId("next-themes-provider");
    expect(provider).toHaveAttribute("attribute", "class");
    expect(provider).toHaveAttribute("defaultTheme", "dark");
  });

  it("renders without crashing when no props are provided", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(getByTestId("next-themes-provider")).toBeInTheDocument();
  });
});
