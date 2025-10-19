import { useState, useEffect } from "react";
import type { User } from "@/types/api";
import { BASE_URL } from "@/lib/varaibles";

const API_URL = `${BASE_URL}/user`;

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User = await response.json();
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const getInitials = () => {
    if (!user) return "U";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(
      0
    )}`.toUpperCase();
  };

  const getFullName = () => {
    if (!user) return "User";
    return `${user.first_name} ${user.last_name}`;
  };

  return { user, loading, error, getInitials, getFullName };
}
