import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWallet } from "../useWallet";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("useWallet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useWallet());

    expect(result.current.loading).toBe(true);
    expect(result.current.wallet).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should fetch wallet data successfully", async () => {
    const mockWallet = {
      balance: 1000.5,
      total_payout: 5000.0,
      total_revenue: 7500.0,
      pending_payout: 250.75,
      ledger_balance: 1200.25,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWallet,
    });

    const { result } = renderHook(() => useWallet());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.wallet).toEqual(mockWallet);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useWallet());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.wallet).toBe(null);
    expect(result.current.error).toBe("Network error");
  });

  it("should handle HTTP error response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useWallet());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.wallet).toBe(null);
    expect(result.current.error).toBe("HTTP error! status: 500");
  });

  it("should handle non-Error exceptions", async () => {
    mockFetch.mockRejectedValueOnce("String error");

    const { result } = renderHook(() => useWallet());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.wallet).toBe(null);
    expect(result.current.error).toBe("Failed to fetch wallet");
  });
});
