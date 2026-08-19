import {
  createAd as createAdService,
  getAds as getAdsService,
  getMyAds as getMyAdsService,
  updateAd as updateAdService,
  deleteAd as deleteAdService,
  getAdById as getAdByIdService,
} from "../services/ad.service.js";
import { sendSuccess } from "../utils/response.js";

const createAd = async (req, res, next) => {
  try {
    const { title, description, price, category, condition, location, images } =
      req.body;

    // Basic required-field validation
    if (
      !title ||
      !description ||
      price === undefined ||
      !category ||
      !condition ||
      !location?.city
    ) {
      const error = new Error(
        "Title, description, price, category, condition and city are required",
      );

      error.statusCode = 400;
      throw error;
    }

    if (Number.isNaN(Number(price)) || Number(price) < 0) {
      const error = new Error("Price must be a valid non-negative number");

      error.statusCode = 400;
      throw error;
    }

    const ad = await createAdService({
      sellerId: req.user.id,
      title,
      description,
      price: Number(price),
      category,
      condition,
      location: {
        city: location.city,
        area: location.area,
      },
      images,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "Ad created successfully",
      data: {
        ad,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyAds = async (req, res, next) => {
  try {
    const ads = await getMyAdsService(req.user.id);

    return sendSuccess(res, {
      statusCode: 200,
      message: "My ads fetched successfully",
      data: {
        ads,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAds = async (req, res, next) => {
  try {
    const ads = await getAdsService();

    return sendSuccess(res, {
      statusCode: 200,
      message: "Ads fetched successfully",
      data: {
        ads,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAdById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Ad ID is required");
      error.statusCode = 400;
      throw error;
    }

    const ad = await getAdByIdService(id);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Ad fetched successfully",
      data: {
        ad,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAd = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      category,
      condition,
      location,
      images,
      status,
    } = req.body;

    if (!id) {
      const error = new Error("Ad ID is required");
      error.statusCode = 400;
      throw error;
    }

    if (
      title === undefined &&
      description === undefined &&
      price === undefined &&
      category === undefined &&
      condition === undefined &&
      location === undefined &&
      images === undefined &&
      status === undefined
    ) {
      const error = new Error(
        "At least one field is required to update the ad",
      );
      error.statusCode = 400;
      throw error;
    }

    if (price !== undefined) {
      if (Number.isNaN(Number(price)) || Number(price) < 0) {
        const error = new Error("Price must be a valid non-negative number");

        error.statusCode = 400;
        throw error;
      }
    }

    const ad = await updateAdService({
      adId: id,
      sellerId: req.user.id,

      title,
      description,
      price: price !== undefined ? Number(price) : undefined,
      category,
      condition,
      location,
      images,
      status,
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Ad updated successfully",
      data: {
        ad,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAd = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Ad ID is required");
      error.statusCode = 400;
      throw error;
    }

    await deleteAdService({
      adId: id,
      sellerId: req.user.id,
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Ad removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createAd, getAds, getMyAds, getAdById, updateAd, deleteAd };
