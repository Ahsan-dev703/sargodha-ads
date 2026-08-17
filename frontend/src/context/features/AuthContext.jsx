import { createContext, useCallback, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "@/services/auth.service";
import { setAccessToken, clearAccessToken } from "@/services/token";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      const currentUser = response.data.user;
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await fetchCurrentUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchCurrentUser]);

  const login = async ({ email, password }) => {
    const response = await loginUser({
      email,
      password,
    });

    const accessToken = response.data.accessToken;
    const loggedInUser = response.data.user;

    setAccessToken(accessToken);
    setUser(loggedInUser);

    return response;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    fetchCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
