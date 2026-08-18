import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getCurrentUser, loginUser, logoutUser } from "@/services/auth.service";
import { clearAccessToken, setAccessToken } from "@/services/token";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);

      const refreshResponse = await fetch(
        "http://localhost:3000/api/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        },
      );

      const refreshData = await refreshResponse.json();

      if (!refreshResponse.ok) {
        setUser(null);
        clearAccessToken();
        return false;
      }

      const accessToken = refreshData?.data?.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);
      }

      const meResponse = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        credentials: "include",
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          "Content-Type": "application/json",
        },
      });

      const meData = await meResponse.json();

      if (!meResponse.ok) {
        setUser(null);
        clearAccessToken();
        return false;
      }

      setUser(meData?.data?.user ?? null);
      return true;
    } catch (error) {
      setUser(null);
      clearAccessToken();
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const response = await loginUser({ email, password });
    const accessToken = response?.data?.accessToken;

    if (accessToken) {
      setAccessToken(accessToken);
    }

    setUser(response?.data?.user ?? null);
    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshSession,
    }),
    [user, loading, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
