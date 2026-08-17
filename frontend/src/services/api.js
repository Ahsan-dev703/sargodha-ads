import { getAccessToken, setAccessToken, clearAccessToken } from "./token.js";

const API_URL = "http://localhost:3000/api";
let refreshPromise = null;

const NO_REFRESH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-token",
  "/auth/logout",
];

const shouldSkipRefresh = (endpoint) => {
  return NO_REFRESH_ENDPOINTS.includes(endpoint);
};

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to refresh access token");
        }

        const newAccessToken = data.data.accessToken;
        setAccessToken(newAccessToken);
        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

/*
 * Main API function.
 */
const api = async (endpoint, options = {}, retry = true) => {
  const accessToken = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && retry && !shouldSkipRefresh(endpoint)) {
    try {
      const newAccessToken = await refreshAccessToken();

      headers.Authorization = `Bearer ${newAccessToken}`;

      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
      });
    } catch (error) {
      clearAccessToken();
    }
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export default api;
