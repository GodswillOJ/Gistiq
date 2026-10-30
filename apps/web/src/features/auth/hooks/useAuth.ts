
"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import type { User } from "../types/auth.types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Reusable authentication check
  const fetchMe = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/me");

      setUser(res.data);
      return res.data;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial authentication check
  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me");

        if (active) {
          setUser(res.data);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    refresh: fetchMe,
  };
}
