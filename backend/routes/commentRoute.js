import express from "express";
import { addComment, deleteComment, editComment, getCommentsByVideo } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Public route to get comments for a video
router.get("/video/:videoId", getCommentsByVideo);

// Protected routes to add/edit/delete comments
router.post("/video/:videoId", verifyToken, addComment);
router.put("/:commentId", verifyToken, editComment);
router.delete("/:commentId", verifyToken, deleteComment);

export default router;
