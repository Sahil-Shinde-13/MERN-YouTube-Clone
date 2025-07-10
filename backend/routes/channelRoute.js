import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createChannel, getChannelById, getMyChannel } from "../controllers/channel.controller.js";


const router = express.Router();

router.post("/", verifyToken, createChannel);

router.get("/me", verifyToken, getMyChannel);

router.get("/:id", getChannelById);


export default router;