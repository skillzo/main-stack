import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppsDropdown } from "../AppsDropdown";

describe("AppsDropdown", () => {
  it("should not render when isOpen is false", () => {
    render(<AppsDropdown isOpen={false} />);

    expect(screen.queryByText("Link in Bio")).not.toBeInTheDocument();
    expect(screen.queryByText("Store")).not.toBeInTheDocument();
  });

  it("should render all apps when isOpen is true", () => {
    render(<AppsDropdown isOpen={true} />);

    expect(screen.getByText("Link in Bio")).toBeInTheDocument();
    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getByText("Media Kit")).toBeInTheDocument();
    expect(screen.getByText("Invoicing")).toBeInTheDocument();
    expect(screen.getByText("Bookings")).toBeInTheDocument();
  });

  it("should render app descriptions", () => {
    render(<AppsDropdown isOpen={true} />);

    expect(screen.getByText("Manage your Link in Bio")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your Store activities")
    ).toBeInTheDocument();
    expect(screen.getByText("Manage your Media Kit")).toBeInTheDocument();
    expect(screen.getByText("Manage your Invoices")).toBeInTheDocument();
    expect(screen.getByText("Manage your Bookings")).toBeInTheDocument();
  });

  it("should render app images with correct alt text", () => {
    render(<AppsDropdown isOpen={true} />);

    const linkImage = screen.getByAltText("Link in Bio");
    const storeImage = screen.getByAltText("Store");
    const mediaKitImage = screen.getByAltText("Media Kit");
    const invoicingImage = screen.getByAltText("Invoicing");
    const bookingsImage = screen.getByAltText("Bookings");

    expect(linkImage).toBeInTheDocument();
    expect(storeImage).toBeInTheDocument();
    expect(mediaKitImage).toBeInTheDocument();
    expect(invoicingImage).toBeInTheDocument();
    expect(bookingsImage).toBeInTheDocument();
  });

  it("should have correct image sources", () => {
    render(<AppsDropdown isOpen={true} />);

    expect(screen.getByAltText("Link in Bio")).toHaveAttribute(
      "src",
      "/src/assets/link.png"
    );
    expect(screen.getByAltText("Store")).toHaveAttribute(
      "src",
      "/src/assets/store.png"
    );
    expect(screen.getByAltText("Media Kit")).toHaveAttribute(
      "src",
      "/src/assets/media-kit.png"
    );
    expect(screen.getByAltText("Invoicing")).toHaveAttribute(
      "src",
      "/src/assets/invoicing.png"
    );
    expect(screen.getByAltText("Bookings")).toHaveAttribute(
      "src",
      "/src/assets/logo.png"
    );
  });

  it("should render buttons for each app", () => {
    render(<AppsDropdown isOpen={true} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  it("should have correct CSS classes for dropdown container", () => {
    const { container } = render(<AppsDropdown isOpen={true} />);

    const dropdown = container.firstChild as HTMLElement;
    expect(dropdown).toHaveClass(
      "absolute",
      "top-full",
      "right-0",
      "mt-2",
      "w-[380px]",
      "bg-white",
      "rounded-2xl",
      "shadow-xl",
      "border",
      "border-border",
      "py-4",
      "z-50"
    );
  });
});
