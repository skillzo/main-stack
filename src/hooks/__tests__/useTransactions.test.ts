import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTransactions } from "../useTransactions";
import type { ApiTransaction } from "@/types/api";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("useTransactions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useTransactions());

    expect(result.current.loading).toBe(true);
    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("should fetch and transform transactions successfully", async () => {
    const mockApiTransactions: ApiTransaction[] = [
      {
        amount: 150.0,
        metadata: {
          name: "John Smith",
          type: "payment",
          email: "john@example.com",
          quantity: 1,
          country: "US",
          product_name: "Premium Plan",
        },
        payment_reference: "PAY-123",
        status: "successful",
        type: "deposit",
        date: "2024-01-15T10:30:00Z",
      },
      {
        amount: -75.5,
        metadata: {
          name: "Jane Doe",
          type: "refund",
          email: "jane@example.com",
          quantity: 1,
          country: "CA",
        },
        payment_reference: "REF-456",
        status: "successful",
        type: "withdrawal",
        date: "2024-01-14T14:20:00Z",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiTransactions,
    });

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toHaveLength(2);
    expect(result.current.transactions[0]).toMatchObject({
      title: "Premium Plan",
      sender: "John Smith",
      amount: 150.0,
      status: "success",
      type: "payment",
    });
    expect(result.current.transactions[1]).toMatchObject({
      title: "Cash withdrawal",
      sender: "Successful",
      amount: -75.5,
      status: "withdrawal",
      type: "withdrawal",
    });
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("should handle HTTP error response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBe("HTTP error! status: 500");
  });

  it("should handle non-Error exceptions", async () => {
    mockFetch.mockRejectedValueOnce("String error");

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch transactions");
  });

  it("should transform withdrawal transactions correctly", async () => {
    const mockApiTransactions: ApiTransaction[] = [
      {
        amount: -100.0,
        status: "successful",
        type: "withdrawal",
        date: "2024-01-15T10:30:00Z",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiTransactions,
    });

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions[0]).toMatchObject({
      title: "Cash withdrawal",
      sender: "Successful",
      amount: -100.0,
      status: "withdrawal",
      type: "withdrawal",
    });
  });

  it("should handle transactions without metadata", async () => {
    const mockApiTransactions: ApiTransaction[] = [
      {
        amount: 200.0,
        status: "successful",
        type: "deposit",
        date: "2024-01-15T10:30:00Z",
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiTransactions,
    });

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions[0]).toMatchObject({
      title: "Transaction",
      sender: "Unknown",
      amount: 200.0,
      status: "success",
      type: "deposit",
    });
  });
});
