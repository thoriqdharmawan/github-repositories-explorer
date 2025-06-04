import { cn } from "../utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe(
      "base active",
    );
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(null, undefined)).toBe("");
  });

  it("should handle arrays of class names", () => {
    expect(cn(["flex", "items-center"], "justify-center")).toBe(
      "flex items-center justify-center",
    );
  });

  it("should handle objects with boolean values", () => {
    expect(
      cn({
        "text-red-500": true,
        "text-blue-500": false,
        "font-bold": true,
      }),
    ).toBe("text-red-500 font-bold");
  });

  it("should merge conflicting Tailwind classes", () => {
    expect(cn("text-sm text-lg")).toBe("text-lg");
    expect(cn("p-2 p-4")).toBe("p-4");
  });

  it("should handle mixed input types", () => {
    expect(
      cn(
        "base",
        ["flex", "items-center"],
        { "text-red-500": true, hidden: false },
        "additional",
      ),
    ).toBe("base flex items-center text-red-500 additional");
  });
});
