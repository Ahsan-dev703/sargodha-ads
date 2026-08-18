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

async function resendVerificationEmail(email) {
  return api("/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
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

const forgotPassword = async (email) => {
  return api("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
};

const resetPassword = async ({ token, password }) => {
  return api(`/auth/reset-password/${encodeURIComponent(token)}`, {
    method: "POST",
    body: JSON.stringify({
      password,
    }),
  });
};

async function logoutUser() {
  return api("/auth/logout", {
    method: "POST",
  });
}

const getCurrentUser = async () => {
  return api("/users/me", {
    method: "GET",
  });
};

async function refreshAccessToken() {
  return api("/auth/refresh-token", {
    method: "POST",
  });
}

export {
  registerUser,
  verifyEmail_fun,
  resendVerificationEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
};
