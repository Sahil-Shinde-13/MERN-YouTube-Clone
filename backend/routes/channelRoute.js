import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createChannel, getMyChannel } from "../controllers/channel.controller.js";


const router = express.Router();

router.post("/", verifyToken, createChannel);

router.get("/me", verifyToken, getMyChannel);



export default router;