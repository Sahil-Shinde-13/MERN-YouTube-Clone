import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/cloudinary.js";
import { dislikeVideo, getAllVideos, getMyVideos, getVideoById, increaseView, likeVideo, updateVideo, uploadVideo } from "../controllers/video.controller.js";


const router = express.Router();

router.get("/my", verifyToken, getMyVideos);

router.post("/upload", verifyToken, upload.fields([{name: "video", maxCount: 1},{name: "thumbnail", maxCount: 1}]), uploadVideo);

router.put("/:id", verifyToken, updateVideo);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.put("/:id/views", increaseView);

router.put("/:id/like", verifyToken, likeVideo);

router.put("/:id/dislike", verifyToken, dislikeVideo);

export default router;