import User from "../models/User.js";

const getUserById = async (userId) => {
  return User.findById(userId).select(
    "_id name email phone avatar location emailVerified createdAt updatedAt",
  );
};

export { getUserById };
