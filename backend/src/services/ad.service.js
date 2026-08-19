import Ad from "../models/Ad.js";

const createAd = async ({
  sellerId,
  title,
  description,
  price,
  category,
  condition,
  location,
  images,
}) => {
  const ad = await Ad.create({
    seller: sellerId,
    title: title.trim(),
    description: description.trim(),
    price,
    category,
    condition,
    location: {
      city: location.city.trim(),
      area: location.area?.trim() || null,
    },
    images: images || [],
  });

  return ad;
};

const getAds = async () => {
  const ads = await Ad.find({
    status: "active",
  })
    .populate("seller", "name avatar")
    .sort({
      createdAt: -1,
    });

  return ads;
};

const getMyAds = async (sellerId) => {
  const ads = await Ad.find({
    seller: sellerId,
    status: { $ne: "removed" },
  }).sort({
    createdAt: -1,
  });

  return ads;
};

const getAdById = async (adId) => {
  const ad = await Ad.findOne({
    _id: adId,
    status: "active",
  }).populate("seller", "name avatar location");

  if (!ad) {
    const error = new Error("Ad not found");
    error.statusCode = 404;
    throw error;
  }

  return ad;
};

const updateAd = async ({
  adId,
  sellerId,
  title,
  description,
  price,
  category,
  condition,
  location,
  images,
  status,
}) => {
  const ad = await Ad.findOne({
    _id: adId,
    seller: sellerId,
  });

  if (!ad) {
    const error = new Error(
      "Ad not found or you are not authorized to edit it",
    );
    error.statusCode = 404;
    throw error;
  }

  if (title !== undefined) {
    ad.title = title.trim();
  }

  if (description !== undefined) {
    ad.description = description.trim();
  }

  if (price !== undefined) {
    ad.price = price;
  }

  if (category !== undefined) {
    ad.category = category;
  }

  if (condition !== undefined) {
    ad.condition = condition;
  }

  if (location !== undefined) {
    if (location.city !== undefined) {
      ad.location.city = location.city.trim();
    }

    if (location.area !== undefined) {
      ad.location.area = location.area?.trim() || null;
    }
  }

  if (images !== undefined) {
    ad.images = images;
  }

  if (status !== undefined) {
    ad.status = status;
  }

  await ad.save();

  return ad;
};

const deleteAd = async ({ adId, sellerId }) => {
  const ad = await Ad.findOneAndDelete({
    _id: adId,
    seller: sellerId,
  });

  if (!ad) {
    const error = new Error(
      "Ad not found or you are not authorized to remove it",
    );

    error.statusCode = 404;
    throw error;
  }

  return ad;
};

export { createAd, getAds, getMyAds, getAdById, updateAd, deleteAd };
