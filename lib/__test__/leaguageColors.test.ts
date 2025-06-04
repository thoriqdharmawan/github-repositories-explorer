import { getLanguageColor } from "../languageColors";

describe("getLanguageColor", () => {
  it("should return correct color for JavaScript", () => {
    expect(getLanguageColor("JavaScript")).toBe("#f1e05a");
  });

  it("should return correct color for TypeScript", () => {
    expect(getLanguageColor("TypeScript")).toBe("#3178c6");
  });

  it("should return correct color for Python", () => {
    expect(getLanguageColor("Python")).toBe("#3572A5");
  });

  it("should return correct color for Java", () => {
    expect(getLanguageColor("Java")).toBe("#b07219");
  });

  it("should return correct color for Go", () => {
    expect(getLanguageColor("Go")).toBe("#00ADD8");
  });

  it("should return correct color for Rust", () => {
    expect(getLanguageColor("Rust")).toBe("#dea584");
  });

  it("should return default color for unknown language", () => {
    expect(getLanguageColor("UnknownLanguage")).toBe("#586069");
  });

  it("should return default color for null input", () => {
    expect(getLanguageColor(null)).toBe("#586069");
  });

  it("should return default color for undefined input", () => {
    expect(getLanguageColor(undefined)).toBe("#586069");
  });

  it("should be case sensitive", () => {
    expect(getLanguageColor("javascript")).toBe("#f1e05a");
    expect(getLanguageColor("JAVASCRIPT")).toBe("#f1e05a");
  });

  it("should return default color for empty string", () => {
    expect(getLanguageColor("")).toBe("#586069");
  });
});
