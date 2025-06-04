import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../SearchInput";

describe("SearchInput", () => {
  const mockProps = {
    searchQuery: "",
    onSearchQueryChange: jest.fn(),
    onSearch: jest.fn(),
    onKeyPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button elements", () => {
    render(<SearchInput {...mockProps} />);

    expect(screen.getByPlaceholderText("Search users...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("displays search query value in input", () => {
    render(<SearchInput {...mockProps} searchQuery="test query" />);

    expect(screen.getByDisplayValue("test query")).toBeInTheDocument();
  });

  it("calls onSearchQueryChange when input value changes", () => {
    render(<SearchInput {...mockProps} />);

    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "new query" } });

    expect(mockProps.onSearchQueryChange).toHaveBeenCalledWith("new query");
  });

  it("calls onSearch when button is clicked", () => {
    render(<SearchInput {...mockProps} />);

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it("calls onKeyPress when key is pressed in input", () => {
    render(<SearchInput {...mockProps} />);

    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockProps.onKeyPress).toHaveBeenCalled();
  });

  it("shows loading state when isLoading is true", () => {
    render(<SearchInput {...mockProps} isLoading={true} />);

    const button = screen.getByRole("button", { name: "Searching..." });
    expect(button).toBeDisabled();
  });

  it("shows normal state when isLoading is false", () => {
    render(<SearchInput {...mockProps} isLoading={false} />);

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).not.toBeDisabled();
  });
});
