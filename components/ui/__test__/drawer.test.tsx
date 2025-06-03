import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "../drawer";

jest.mock("vaul", () => ({
  Drawer: {
    Root: ({ children, ...props }: any) => (
      <div data-testid="drawer-root" {...props}>
        {children}
      </div>
    ),
    Trigger: ({ children, ...props }: any) => (
      <button data-testid="drawer-trigger" {...props}>
        {children}
      </button>
    ),
    Portal: ({ children, ...props }: any) => (
      <div data-testid="drawer-portal" {...props}>
        {children}
      </div>
    ),
    Close: ({ children, ...props }: any) => (
      <button data-testid="drawer-close" {...props}>
        {children}
      </button>
    ),
    Overlay: ({ children, ...props }: any) => (
      <div data-testid="drawer-overlay" {...props}>
        {children}
      </div>
    ),
    Content: ({ children, ...props }: any) => (
      <div data-testid="drawer-content" {...props}>
        {children}
      </div>
    ),
    Title: ({ children, ...props }: any) => (
      <h2 data-testid="drawer-title" {...props}>
        {children}
      </h2>
    ),
    Description: ({ children, ...props }: any) => (
      <p data-testid="drawer-description" {...props}>
        {children}
      </p>
    ),
  },
}));

describe("Drawer Components", () => {
  it("renders Drawer component", () => {
    render(
      <Drawer>
        <div>Content</div>
      </Drawer>,
    );
    expect(screen.getByTestId("drawer-root")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-root")).toHaveAttribute(
      "data-slot",
      "drawer",
    );
  });

  it("renders DrawerTrigger component", () => {
    render(<DrawerTrigger>Open Drawer</DrawerTrigger>);
    expect(screen.getByTestId("drawer-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-trigger")).toHaveAttribute(
      "data-slot",
      "drawer-trigger",
    );
    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
  });

  it("renders DrawerPortal component", () => {
    render(
      <DrawerPortal>
        <div>Portal Content</div>
      </DrawerPortal>,
    );
    expect(screen.getByTestId("drawer-portal")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-portal")).toHaveAttribute(
      "data-slot",
      "drawer-portal",
    );
    expect(screen.getByText("Portal Content")).toBeInTheDocument();
  });

  it("renders DrawerClose component", () => {
    render(<DrawerClose>Close</DrawerClose>);
    expect(screen.getByTestId("drawer-close")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-close")).toHaveAttribute(
      "data-slot",
      "drawer-close",
    );
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("renders DrawerOverlay with default classes", () => {
    render(<DrawerOverlay />);
    const overlay = screen.getByTestId("drawer-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute("data-slot", "drawer-overlay");
  });

  it("renders DrawerContent with children", () => {
    render(
      <DrawerContent>
        <div>Test Content</div>
      </DrawerContent>,
    );
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-content")).toHaveAttribute(
      "data-slot",
      "drawer-content",
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders DrawerHeader with default classes", () => {
    render(<DrawerHeader>Header Content</DrawerHeader>);
    const header = screen.getByText("Header Content");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-slot", "drawer-header");
  });

  it("renders DrawerFooter with default classes", () => {
    render(<DrawerFooter>Footer Content</DrawerFooter>);
    const footer = screen.getByText("Footer Content");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-slot", "drawer-footer");
  });

  it("renders DrawerTitle component", () => {
    render(<DrawerTitle>Title Text</DrawerTitle>);
    expect(screen.getByTestId("drawer-title")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-title")).toHaveAttribute(
      "data-slot",
      "drawer-title",
    );
    expect(screen.getByText("Title Text")).toBeInTheDocument();
  });

  it("renders DrawerDescription component", () => {
    render(<DrawerDescription>Description Text</DrawerDescription>);
    expect(screen.getByTestId("drawer-description")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-description")).toHaveAttribute(
      "data-slot",
      "drawer-description",
    );
    expect(screen.getByText("Description Text")).toBeInTheDocument();
  });

  it("applies custom className to components", () => {
    render(<DrawerHeader className="custom-class">Header</DrawerHeader>);
    const header = screen.getByText("Header");
    expect(header).toHaveClass("custom-class");
  });
});
