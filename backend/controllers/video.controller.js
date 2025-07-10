
import Video from "../models/Video.model.js";
import Channel from "../models/Channel.model.js"

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

        const channel = await Channel.findOne({ userId: req.user.id });
        if (!channel) return res.status(404).json({ message: "Channel not found" });

        // Create new Video document with cloud URLs
        const newVideo = new Video({
            title,
            description,
            videoUrl: videoFile.path,
            thumbnailUrl: thumbnailFile.path,
            channelId: channel._id,
        });

        // Save video to MongoDB
        await newVideo.save();
        res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
    } catch (error) {
        console.error("Video Upload Error:", error);
        res.status(500).json({ message: "Server error while uploading video" });
    }
};


export const getAllVideos = async(req,res) =>{
    try {
        const videos = await Video.find().populate("channelId", "name avatar");
        res.status(200).json(videos);
    } catch (error) {
        console.error("Fetch Videos Error:", error);
        res.status(500).json({ message: "Failed to fetch videos" });
    }
}

export const getVideoById = async(req,res)=>{
    try {
        const video = await Video.findById(req.params.id).populate("channelId", "name avatar");
        if(!video){
            return res.status(404).json({message: "Video not Found"});
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const increaseView = async(req,res)=>{
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            {$inc: {views: 1}},
            {new: true}
        );
        if(!video){
           return res.status(404).json({message: "Video not found"})
        }
        res.status(200).json(video);
    } catch (error) {
        console.error("Increase Views Error:", error);
        res.status(500).json({ message: "Failed to increase views" });
    }
}

export const likeVideo = async(req,res)=>{
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        const userId = req.user.id;

        if(video.likes.includes(userId)){
            video.likes.pull(userId);
        }else{
            video.likes.push(userId);
            video.dislikes.pull(userId);
        }

        await video.save();
        res.status(200).json({ likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (error) {
        res.status(500).json({ message: "Failed to like video" });
    }
}

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user.id;

    // If already disliked, remove it
    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId);
    } else {
      video.dislikes.push(userId);
      video.likes.pull(userId); // remove from likes if present
    }

    await video.save();
    res.status(200).json({ likes: video.likes.length, dislikes: video.dislikes.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to dislike video" });
  }
};

// Get My Videos for channel
export const getMyVideos = async (req, res) => {
  try {
    const channel = await Channel.findOne({ userId: req.user.id });
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const videos = await Video.find({ channelId: channel._id }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    console.error("GetMyVideos Error:", err);
    res.status(500).json({ message: "Failed to get your videos" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const channel = await Channel.findOne({ userId: req.user.id });
    if (!channel || String(channel._id) !== String(video.channelId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description } = req.body;
    video.title = title || video.title;
    video.description = description || video.description;

    await video.save();
    res.status(200).json({ message: "Video updated successfully", video });
  } catch (err) {
    console.error("Update Video Error:", err);
    res.status(500).json({ message: "Failed to update video" });
  }
};
