import React from "react";
import { render, screen, act } from "@testing-library/react";
import DetailViews from "../DetailViews";

const mockSetSelectedUser = jest.fn();
const mockSetSelectedRepo = jest.fn();

jest.mock("@/providers/DetailProvider", () => ({
  useDetailContext: () => ({
    selectedUser: null,
    selectedRepo: null,
    setSelectedUser: mockSetSelectedUser,
    setSelectedRepo: mockSetSelectedRepo,
  }),
}));

jest.mock("@/components/ui/drawer", () => ({
  Drawer: ({ children, open, onOpenChange }: any) => (
    <div data-testid="drawer" data-open={open}>
      {open && children}
      <button onClick={() => onOpenChange(false)}>Close</button>
    </div>
  ),
  DrawerContent: ({ children }: any) => (
    <div data-testid="drawer-content">{children}</div>
  ),
  DrawerHeader: ({ children }: any) => (
    <div data-testid="drawer-header">{children}</div>
  ),
  DrawerTitle: ({ children }: any) => <h2>{children}</h2>,
}));

jest.mock("@/features/user-detail", () => ({
  __esModule: true,
  default: ({ user, onClose, hideHeader }: any) => (
    <div data-testid="user-detail">
      <span>User: {user.login}</span>
      <button onClick={onClose}>Close User</button>
      {hideHeader && <span data-testid="hide-header">Header Hidden</span>}
    </div>
  ),
}));

jest.mock("@/features/repo-detail", () => ({
  __esModule: true,
  default: ({ repo, onClose, hideHeader }: any) => (
    <div data-testid="repo-detail">
      <span>Repo: {repo.name}</span>
      <button onClick={onClose}>Close Repo</button>
      {hideHeader && <span data-testid="hide-header">Header Hidden</span>}
    </div>
  ),
}));

const mockResizeWindow = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event("resize"));
};

describe("DetailViews", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1280,
    });
  });

  it("renders without crashing on desktop", () => {
    render(<DetailViews />);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("shows desktop layout when screen width >= 1024px", () => {
    mockResizeWindow(1280);
    render(<DetailViews />);

    expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();
  });

  it("shows mobile layout when screen width < 1024px", () => {
    mockResizeWindow(768);
    render(<DetailViews />);

    expect(screen.getAllByTestId("drawer")).toHaveLength(2);
  });

  it("handles window resize events", () => {
    render(<DetailViews />);

    act(() => {
      mockResizeWindow(768);
    });

    expect(screen.getAllByTestId("drawer")).toHaveLength(2);
  });

  it("cleans up resize event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<DetailViews />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  describe("Desktop Layout", () => {
    beforeEach(() => {
      mockResizeWindow(1280);
    });

    it("shows collapsed state when no detail is selected", () => {
      render(<DetailViews />);
      const container = screen.getByRole("complementary");
      expect(container).toHaveClass("w-0");
    });
  });

  describe("Mobile Layout", () => {
    beforeEach(() => {
      mockResizeWindow(768);
    });

    it("does not render drawer content when nothing is selected", () => {
      render(<DetailViews />);
      const drawers = screen.getAllByTestId("drawer");
      expect(drawers[0]).toHaveAttribute("data-open", "false");
      expect(drawers[1]).toHaveAttribute("data-open", "false");
    });
  });
});
