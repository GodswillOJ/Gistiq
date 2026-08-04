"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import type { User } from "../types/auth.types";

const API = process.env.NEXT_PUBLIC_API_URL;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

    const fetchMe = useCallback(async () => {
    try {
        const res = await axios.get(`${API}/auth/me`, {
        withCredentials: true,
        });

        setUser(res.data);
    } catch {
        setUser(null);
    } finally {
        setLoading(false);
    }
    }, []);

    useEffect(() => {
    let mounted = true;

    async function loadUser() {
        try {
        const res = await axios.get(`${API}/auth/me`, {
            withCredentials: true,
        });

        if (mounted) {
            setUser(res.data);
        }
        } catch {
        if (mounted) {
            setUser(null);
        }
        } finally {
        if (mounted) {
            setLoading(false);
        }
        }
    }

    loadUser();

    return () => {
        mounted = false;
    };
    }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    refresh: fetchMe,
  };
}