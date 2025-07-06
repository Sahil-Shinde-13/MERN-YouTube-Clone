
import Video from "../models/Video.model.js";

export const uploadVideo = async (req,res) =>{
    try {
        const {title,description} = req.body;

        const videoFile = req.files["video"]?.[0];
        const thumbnailFile = req.files["thumbnail"]?.[0];

        if(!videoFile || !thumbnailFile){
            return res.status(400).json({message: "Both video and thumbnail are required"})
        }

        const newVideo = new Video({
            title,
            description,
            videoUrl: videoFile.path,
            thumbnailUrl: thumbnailFile.path,
            channelId: req.user.id,
        });

        await newVideo.save();
        res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
    } catch (error) {
        console.error("Video Upload Error:", error);
        res.status(500).json({ message: "Server error while uploading video" });
    }
};