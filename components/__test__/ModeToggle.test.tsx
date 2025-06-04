import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "next-themes";
import { ModeToggle } from "../ModeToggle";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: any) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
  DropdownMenuContent: ({ children }: any) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick }: any) => (
    <div data-testid="dropdown-item" onClick={onClick}>
      {children}
    </div>
  ),
}));

jest.mock("lucide-react", () => ({
  Sun: () => <div data-testid="sun-icon" />,
  Moon: () => <div data-testid="moon-icon" />,
}));

describe("ModeToggle", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      setTheme: mockSetTheme,
    });
    mockSetTheme.mockClear();
  });

  it("renders the toggle button with theme icons", () => {
    render(<ModeToggle />);

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });

  it("renders dropdown menu with theme options", () => {
    render(<ModeToggle />);

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it('calls setTheme with "light" when Light option is clicked', () => {
    render(<ModeToggle />);

    const lightOption = screen.getByText("Light");
    fireEvent.click(lightOption);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it('calls setTheme with "dark" when Dark option is clicked', () => {
    render(<ModeToggle />);

    const darkOption = screen.getByText("Dark");
    fireEvent.click(darkOption);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it('calls setTheme with "system" when System option is clicked', () => {
    render(<ModeToggle />);

    const systemOption = screen.getByText("System");
    fireEvent.click(systemOption);

    expect(mockSetTheme).toHaveBeenCalledWith("system");
  });

  it("renders with correct dropdown structure", () => {
    render(<ModeToggle />);

    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
    expect(screen.getAllByTestId("dropdown-item")).toHaveLength(3);
  });
});
