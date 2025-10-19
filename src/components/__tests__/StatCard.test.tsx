import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatCard } from "../revenue/StatCard";

describe("StatCard", () => {
  it("should render title and value correctly", () => {
    render(<StatCard title="Total Revenue" value={1234.56} />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("USD 1,234.56")).toBeInTheDocument();
  });

  it("should format currency with correct locale", () => {
    render(<StatCard title="Balance" value={1000.0} />);

    expect(screen.getByText("USD 1,000.00")).toBeInTheDocument();
  });

  it("should handle zero values", () => {
    render(<StatCard title="Pending" value={0} />);

    expect(screen.getByText("USD 0.00")).toBeInTheDocument();
  });

  it("should handle negative values", () => {
    render(<StatCard title="Debt" value={-500.25} />);

    expect(screen.getByText("USD -500.25")).toBeInTheDocument();
  });

  it("should handle decimal values with proper formatting", () => {
    render(<StatCard title="Precise" value={123.456} />);

    expect(screen.getByText("USD 123.46")).toBeInTheDocument();
  });

  it("should render info button", () => {
    render(<StatCard title="Test" value={100} />);

    const infoButton = screen.getByRole("button");
    expect(infoButton).toBeInTheDocument();
  });

  it("should have correct CSS classes for container", () => {
    const { container } = render(<StatCard title="Test" value={100} />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveClass("bg-white", "rounded-2xl");
  });

  it("should display title in muted text", () => {
    render(<StatCard title="Test Title" value={100} />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("should display value with correct font weight", () => {
    render(<StatCard title="Test" value={100} />);

    const valueElement = screen.getByText("USD 100.00");
    expect(valueElement).toHaveClass("text-xl", "sm:text-2xl", "font-semibold");
  });
});
