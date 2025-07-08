import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/cloudinary.js";
import { getAllVideos, getVideoById, uploadVideo } from "../controllers/video.controller.js";


const router = express.Router();

router.post("/upload", verifyToken, upload.fields([{name: "video", maxCount: 1},{name: "thumbnail", maxCount: 1}]), uploadVideo);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

export default router;