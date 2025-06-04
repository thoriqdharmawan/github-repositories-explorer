import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../dropdown-menu";

describe("DropdownMenu Components", () => {
  it("renders DropdownMenu with trigger and content", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("renders DropdownMenuItem with correct props", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem data-testid="menu-item">Test Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const menuItem = screen.getByTestId("menu-item");
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveAttribute("data-slot", "dropdown-menu-item");
    expect(menuItem).toHaveAttribute("data-variant", "default");
  });

  it("renders DropdownMenuItem with destructive variant", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            variant="destructive"
            data-testid="destructive-item"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const menuItem = screen.getByTestId("destructive-item");
    expect(menuItem).toHaveAttribute("data-variant", "destructive");
  });

  it("renders DropdownMenuItem with inset prop", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset data-testid="inset-item">
            Inset Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const menuItem = screen.getByTestId("inset-item");
    expect(menuItem).toHaveAttribute("data-inset", "true");
  });

  it("renders DropdownMenuCheckboxItem", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked data-testid="checkbox-item">
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const checkboxItem = screen.getByTestId("checkbox-item");
    expect(checkboxItem).toBeInTheDocument();
    expect(checkboxItem).toHaveAttribute(
      "data-slot",
      "dropdown-menu-checkbox-item",
    );
  });

  it("renders DropdownMenuRadioGroup with RadioItem", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="option1" data-testid="radio-item">
              Option 1
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const radioItem = screen.getByTestId("radio-item");
    expect(radioItem).toBeInTheDocument();
    expect(radioItem).toHaveAttribute("data-slot", "dropdown-menu-radio-item");
  });

  it("renders DropdownMenuLabel", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel data-testid="label">My Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("data-slot", "dropdown-menu-label");
  });

  it("renders DropdownMenuLabel with inset", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset data-testid="inset-label">
            Inset Label
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const label = screen.getByTestId("inset-label");
    expect(label).toHaveAttribute("data-inset", "true");
  });

  it("renders DropdownMenuSeparator", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator data-testid="separator" />
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-slot", "dropdown-menu-separator");
  });

  it("renders DropdownMenuShortcut", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item
            <DropdownMenuShortcut data-testid="shortcut">
              ⌘K
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const shortcut = screen.getByTestId("shortcut");
    expect(shortcut).toBeInTheDocument();
    expect(shortcut).toHaveAttribute("data-slot", "dropdown-menu-shortcut");
    expect(shortcut).toHaveTextContent("⌘K");
  });

  it("renders DropdownMenuSub with SubTrigger and SubContent", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid="sub-trigger">
              More options
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const subTrigger = screen.getByTestId("sub-trigger");
    expect(subTrigger).toBeInTheDocument();
    expect(subTrigger).toHaveAttribute(
      "data-slot",
      "dropdown-menu-sub-trigger",
    );
  });

  it("renders DropdownMenuSubTrigger with inset", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset data-testid="inset-sub-trigger">
              Inset Sub
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const subTrigger = screen.getByTestId("inset-sub-trigger");
    expect(subTrigger).toHaveAttribute("data-inset", "true");
  });

  it("applies custom className to components", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content">
          <DropdownMenuItem className="custom-item">Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(document.querySelector(".custom-content")).toBeInTheDocument();
    expect(document.querySelector(".custom-item")).toBeInTheDocument();
  });

  it("renders DropdownMenuPortal correctly", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuItem>Item in Portal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>,
    );

    expect(screen.getByText("Item in Portal")).toBeInTheDocument();
  });

  it("renders DropdownMenuGroup", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Group Item 1</DropdownMenuItem>
            <DropdownMenuItem>Group Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("Group Item 1")).toBeInTheDocument();
    expect(screen.getByText("Group Item 2")).toBeInTheDocument();
  });
});
