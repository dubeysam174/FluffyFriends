import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";    


// ======================
// Get Logged-in User
// ======================
export const getUserProfile = asyncHandler(async (req, res) => {

    return res.status(200).json({
        success: true,
        user: req.user
    });

});


// Update Logged-in User

export const updateUserProfile = asyncHandler(async (req, res) => {

    const { name, phone } = req.body;

    const user = req.user;

    if (name) user.name = name;
    if (phone) user.phone = phone;

    // Later
    // if(req.file){
    //     user.profilePhoto = imageUrl;
    // }

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    });

});