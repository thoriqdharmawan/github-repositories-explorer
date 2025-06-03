import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";

describe("Input Component", () => {
  it("renders input element correctly", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("applies default classes correctly", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "flex",
      "h-9",
      "w-full",
      "min-w-0",
      "rounded-md",
      "border",
    );
    expect(input).toHaveClass(
      "bg-transparent",
      "px-3",
      "py-1",
      "text-base",
      "shadow-xs",
    );
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("accepts and applies custom className", () => {
    const customClass = "custom-input-class";
    render(<Input className={customClass} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(customClass);
  });

  it("sets input type correctly", () => {
    render(<Input type="password" />);
    const input = screen.getByDisplayValue("");

    expect(input).toHaveAttribute("type", "password");
  });

  it("defaults to text type when no type is specified", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input.getAttribute("type")).toBeNull();
  });

  it("handles placeholder correctly", () => {
    const placeholder = "Enter your name";
    render(<Input placeholder={placeholder} />);
    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toBeInTheDocument();
  });

  it("handles value and onChange correctly", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const testValue = "test input";

    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, testValue);

    expect(handleChange).toHaveBeenCalled();
  });

  it("handles disabled state correctly", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    );
  });

  it("handles required attribute", () => {
    render(<Input required />);
    const input = screen.getByRole("textbox");

    expect(input).toBeRequired();
  });

  it("handles name attribute", () => {
    const name = "email";
    render(<Input name={name} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("name", name);
  });

  it("handles id attribute", () => {
    const id = "email-input";
    render(<Input id={id} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("id", id);
  });

  it("handles maxLength attribute", () => {
    const maxLength = 50;
    render(<Input maxLength={maxLength} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("maxLength", maxLength.toString());
  });

  it("handles readOnly attribute", () => {
    render(<Input readOnly />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("readOnly");
  });

  it("handles autoComplete attribute", () => {
    const autoComplete = "email";
    render(<Input autoComplete={autoComplete} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("autoComplete", autoComplete);
  });

  it("handles autoFocus attribute", () => {
    render(<Input autoFocus />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveFocus();
  });

  it("applies focus-visible classes for keyboard navigation", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "focus-visible:border-ring",
      "focus-visible:ring-ring/50",
      "focus-visible:ring-[3px]",
    );
  });

  it("applies aria-invalid classes for invalid state", () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "aria-invalid:ring-destructive/20",
      "aria-invalid:border-destructive",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("handles file input type with correct classes", () => {
    render(<Input type="file" />);
    const input = screen.getByDisplayValue("");

    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveClass(
      "file:text-foreground",
      "file:inline-flex",
      "file:h-7",
      "file:border-0",
      "file:bg-transparent",
      "file:text-sm",
      "file:font-medium",
    );
  });

  it("handles number input type", () => {
    render(<Input type="number" />);
    const input = screen.getByRole("spinbutton");

    expect(input).toHaveAttribute("type", "number");
  });

  it("handles email input type", () => {
    render(<Input type="email" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "email");
  });

  it("handles tel input type", () => {
    render(<Input type="tel" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "tel");
  });

  it("handles url input type", () => {
    render(<Input type="url" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "url");
  });

  it("handles search input type", () => {
    render(<Input type="search" />);
    const input = screen.getByRole("searchbox");

    expect(input).toHaveAttribute("type", "search");
  });

  it("merges custom classes with default classes correctly", () => {
    const customClass = "border-red-500 bg-red-100";
    render(<Input className={customClass} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("flex", "h-9", "w-full");
    expect(input).toHaveClass("border-red-500", "bg-red-100");
  });

  it("handles all HTML input attributes correctly", () => {
    const props = {
      "data-testid": "test-input",
      "aria-label": "Test input",
      "aria-describedby": "help-text",
      min: "0",
      max: "100",
      step: "1",
      pattern: "[0-9]*",
      title: "Only numbers allowed",
    };

    render(<Input {...props} />);
    const input = screen.getByTestId("test-input");

    Object.entries(props).forEach(([key, value]) => {
      expect(input).toHaveAttribute(key, value);
    });
  });

  it("handles controlled input correctly", async () => {
    const user = userEvent.setup();
    const TestControlledInput = () => {
      const [value, setValue] = React.useState("");

      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-testid="controlled-input"
        />
      );
    };

    render(<TestControlledInput />);
    const input = screen.getByTestId("controlled-input");

    await user.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });

  it("handles uncontrolled input correctly", async () => {
    const user = userEvent.setup();
    render(
      <Input defaultValue="Initial Value" data-testid="uncontrolled-input" />,
    );
    const input = screen.getByTestId("uncontrolled-input");

    expect(input).toHaveValue("Initial Value");

    await user.clear(input);
    await user.type(input, "New Value");
    expect(input).toHaveValue("New Value");
  });
});
