import api from "@/services/api";

const getCurrentUser = async () => {
  return api("/users/me", {
    method: "GET",
  });
};

async function updateCurrentUser(updates) {
  return api("/users/me", {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export { getCurrentUser, updateCurrentUser };
