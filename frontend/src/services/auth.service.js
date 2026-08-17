import api from "@/services/api";

async function registerUser({ name, email, password }) {
  return api("/auth/register", {
    method: "POST",

    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

async function verifyEmail_fun(token) {
  return api(`/auth/verify-email/${encodeURIComponent(token)}`, {
    method: "GET",
  });
}

async function loginUser({ email, password }) {
  return api("/auth/login", {
    method: "POST",

    body: JSON.stringify({
      email,
      password,
    }),
  });
}

async function logoutUser() {
  return api("/auth/logout", {
    method: "POST",
  });
}

async function getCurrentUser() {
  return api("/users/me");
}

export { registerUser, verifyEmail_fun, loginUser, logoutUser, getCurrentUser };
