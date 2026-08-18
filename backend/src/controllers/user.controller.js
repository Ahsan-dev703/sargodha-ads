import { getUserById } from "../services/user.service.js";

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

export { getCurrentUser };
