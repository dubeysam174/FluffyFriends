import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";    
import { uploadCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js'

// ======================
// Get Logged-in User
// ======================
export const getUserProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// ======================
// Update Logged-in User
// ======================
export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    console.log("🔍 DEBUG: req.file =", req.file);
    console.log("🔍 DEBUG: req.body =", req.body);
    console.log("🔍 DEBUG: Cloudinary config =", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
    });

    const { name, email, city } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (email) user.email = email;
    if (city) user.city = city;

    if (req.file) {
      console.log("📁 Uploading file...");
      try {
        const result = await uploadCloudinary(req.file.path, 'fluffyfriends/avatars');
        user.avatar = result.url;
        console.log("✅ Upload success:", result.url);
        
        const fs = await import('fs').then(m => m.default);
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error("❌ Upload failed:", uploadError);
        throw uploadError;
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        city: user.city,
      }
    });
  } catch (error) {
    console.error("❌ Controller error:", error);
    throw error;
  }
});

// ======================
// Delete User Account
// ======================
export const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  // ✅ Delete avatar from Cloudinary
  if (user.avatar && user.avatar.includes('cloudinary')) {
    const publicId = user.avatar.split('/').pop().split('.')[0];
    await deleteFromCloudinary(`fluffyfriends/avatars/${publicId}`);
  }

  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: "Account deleted successfully"
  });
});