import api from "@/services/api";

async function getAds() {
  return api("/ads", {
    method: "GET",
  });
}

const getMyAds = async () => {
  return api("/ads/my-ads", {
    method: "GET",
  });
};

async function updateAd({ id, ...updates }) {
  return api(`/ads/${encodeURIComponent(id)}`, {
    method: "PATCH",

    body: JSON.stringify(updates),
  });
}

async function deleteAd(id) {
  return api(`/ads/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

const createAd = async (adData) => {
  return api("/ads", {
    method: "POST",
    body: JSON.stringify(adData),
  });
};

async function getAdById(id) {
  return api(`/ads/${encodeURIComponent(id)}`, {
    method: "GET",
  });
}
export { getAds, getMyAds, updateAd, deleteAd, createAd, getAdById };
