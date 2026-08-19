import { getUserById, updateUserProfile } from "../services/user.service.js";

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateCurrentUser = async (req, res, next) => {
  try {
    const updates = req.body;

    if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
      const error = new Error("Invalid request body");
      error.statusCode = 400;
      throw error;
    }

    const allowedFields = ["name", "phone", "avatar", "location"];

    const invalidFields = Object.keys(updates).filter(
      (field) => !allowedFields.includes(field),
    );

    if (invalidFields.length > 0) {
      const error = new Error(
        `The following fields cannot be updated: ${invalidFields.join(", ")}`,
      );

      error.statusCode = 400;
      throw error;
    }

    if (Object.keys(updates).length === 0) {
      const error = new Error("No fields provided for update");
      error.statusCode = 400;
      throw error;
    }

    const user = await updateUserProfile(req.user.id, updates);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getCurrentUser , updateCurrentUser };
