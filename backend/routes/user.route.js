import express from "express";
import {
    getUserProfile,
    updateUserProfile
} from "../controllers/user.controller.js";
import multer from 'multer'


import { protect } from "../middleware/auth.middleware.js";

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const router = express.Router();

router.get("/profile",protect , getUserProfile);

router.put("/update-profile", protect,upload.single('avatar'), updateUserProfile);

export default router;