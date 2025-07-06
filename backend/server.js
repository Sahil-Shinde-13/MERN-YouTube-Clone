import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes )

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`DB connected successfully`);
})
.catch(()=>{
    console.log(`DB is not connected`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running at post ${PORT}`);
});