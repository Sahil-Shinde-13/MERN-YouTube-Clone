
import Video from "../models/Video.model.js";

export const uploadVideo = async (req,res) =>{
    try {
        const {title,description} = req.body;

        // Extracted uploaded files
        const videoFile = req.files["video"]?.[0];
        const thumbnailFile = req.files["thumbnail"]?.[0];

        // Validate if both video and thumbnail are uploaded
        if(!videoFile || !thumbnailFile){
            return res.status(400).json({message: "Both video and thumbnail are required"})
        }

        // Create new Video document with cloud URLs
        const newVideo = new Video({
            title,
            description,
            videoUrl: videoFile.path,
            thumbnailUrl: thumbnailFile.path,
            channelId: req.user.id,
        });

        // Save video to MongoDB
        await newVideo.save();
        res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
    } catch (error) {
        console.error("Video Upload Error:", error);
        res.status(500).json({ message: "Server error while uploading video" });
    }
};