import api from "@/services/api";

const login = async ({ email, password }) => {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

const logout = async () => {
  return api("/auth/logout", {
    method: "POST",
  });
};

const getCurrentUser = async () => {
  return api("/users/me");
};

export { login, logout, getCurrentUser };
