import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateRegisterInput } from "../middlewares/validateUser.middleware.js";


const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", login);

export default router;