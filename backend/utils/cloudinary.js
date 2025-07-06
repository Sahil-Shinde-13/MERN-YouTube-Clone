import cloudinary from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary using credentials from .env file
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage engine for Multer to store files directly on Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "youtube_clone_videos", // Folder name on Cloudinary
        resource_type: "auto", // Automatically detect file type 
    },
});

// Initialize multer with Cloudinary storage
const upload = multer({storage});

export {cloudinary, upload};