import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("text-sm", "font-medium", "text-gray-900");
    expect(result).toBe("text-sm font-medium text-gray-900");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should handle false conditional classes", () => {
    const isActive = false;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base-class", undefined, null, "valid-class");
    expect(result).toBe("base-class valid-class");
  });

  it("should handle empty strings", () => {
    const result = cn("base-class", "", "valid-class");
    expect(result).toBe("base-class valid-class");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["text-sm", "font-medium"], "text-gray-900");
    expect(result).toBe("text-sm font-medium text-gray-900");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      "text-sm": true,
      "font-medium": false,
      "text-gray-900": true,
    });
    expect(result).toBe("text-sm text-gray-900");
  });

  it("should handle mixed input types", () => {
    const isActive = true;
    const result = cn(
      "base-class",
      ["array-class-1", "array-class-2"],
      {
        "object-class": isActive,
        "false-class": false,
      },
      "string-class"
    );
    expect(result).toBe(
      "base-class array-class-1 array-class-2 object-class string-class"
    );
  });

  it("should handle Tailwind CSS conflicts", () => {
    const result = cn("text-sm text-lg", "font-medium");
    expect(result).toBe("text-lg font-medium");
  });

  it("should handle no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle single class", () => {
    const result = cn("single-class");
    expect(result).toBe("single-class");
  });

  it("should handle complex Tailwind merging", () => {
    const result = cn("px-2 py-1", "px-4 py-2", "bg-blue-500", "bg-red-500");
    expect(result).toBe("px-4 py-2 bg-red-500");
  });
});
