import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";    


// ======================
// Get Logged-in User
// ======================
export const getUserProfile =  asyncHandler(async(req, res) => {
   

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    
});

// ======================
// Update Logged-in User
// ======================
export const updateUserProfile = asyncHandler(async(req, res) => {
    

        const { name, phone } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update only if value exists
        if (name) user.name = name;
        if (phone) user.phone = phone;

        // If you're uploading an image later
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