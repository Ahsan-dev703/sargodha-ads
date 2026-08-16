import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
} from "@/services/auth.service";

import {
  setAccessToken,
  clearAccessToken,
} from "@/services/token";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(
    async () => {
      try {
        const response =
          await getCurrentUser();

        const currentUser =
          response.data.user;

        setUser(currentUser);

        return currentUser;
      } catch {
        setUser(null);

        return null;
      }
    },
    []
  );

  useEffect(() => {
    const initializeAuth = async () => {
      await fetchCurrentUser();

      setLoading(false);
    };

    initializeAuth();
  }, [fetchCurrentUser]);

  const login = async ({
    email,
    password,
  }) => {
    const response =
      await loginService({
        email,
        password,
      });

    setAccessToken(
      response.data.accessToken
    );

    setUser(response.data.user);

    return response;
  };

  const logout = async () => {
    try {
      await logoutService();
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext , AuthProvider};