import { getAccessToken, setAccessToken, clearAccessToken } from "./token.js";

const API_URL = "http://localhost:3000/api";

let refreshPromise = null;

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

const api = async (endpoint, options = {}, retry = true) => {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && retry && endpoint !== "/auth/refresh-token") {
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
      throw error;
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
