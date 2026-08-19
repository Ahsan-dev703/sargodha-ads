import User from "../models/User.js";

const getUserById = async (userId) => {
  return User.findById(userId).select(
    "_id name email phone avatar location emailVerified createdAt updatedAt",
  );
};

const updateUserProfile = async (userId, updates) => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  if (updates.name !== undefined) {
    user.name = updates.name.trim();
  }

  if (updates.phone !== undefined) {
    user.phone = updates.phone === null ? null : updates.phone.trim();
  }

  if (updates.avatar !== undefined) {
    user.avatar = updates.avatar === null ? null : updates.avatar.trim();
  }

  if (updates.location !== undefined) {
    if (updates.location.city !== undefined) {
      user.location.city =
        updates.location.city === null ? null : updates.location.city.trim();
    }

    if (updates.location.area !== undefined) {
      user.location.area =
        updates.location.area === null ? null : updates.location.area.trim();
    }
  }

  await user.save();

  return User.findById(userId).select(
    "_id name email phone avatar location emailVerified createdAt updatedAt",
  );
};

export { getUserById, updateUserProfile };
