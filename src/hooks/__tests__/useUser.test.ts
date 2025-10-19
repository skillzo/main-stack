import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUser } from "../useUser";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("useUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should fetch user data successfully", async () => {
    const mockUser = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe("Network error");
  });

  it("should handle HTTP error response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe("HTTP error! status: 404");
  });

  it("should return correct initials", async () => {
    const mockUser = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getInitials()).toBe("JD");
  });

  it("should return default initials when user is null", () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.getInitials()).toBe("U");
  });

  it("should return correct full name", async () => {
    const mockUser = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.getFullName()).toBe("John Doe");
  });

  it("should return default full name when user is null", () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.getFullName()).toBe("User");
  });
});
