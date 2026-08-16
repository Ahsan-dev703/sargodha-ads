const API_URL = "http://localhost:3000/api";

const api = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

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
