import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import channelRoutes from "./routes/channelRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//API Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);

// MongoDB Connection using Mongoose
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`DB connected successfully`);
})
.catch(()=>{
    console.log(`DB is not connected`);
});

//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running at post ${PORT}`);
});