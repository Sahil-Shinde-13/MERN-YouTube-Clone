
import Video from "../models/Video.model.js";
import Channel from "../models/Channel.model.js"

// Upload a new video
export const uploadVideo = async (req,res) =>{
    try {
        const {title,description,category} = req.body;

        // Validate input
        if (!title || !description || !category) {
          return res.status(400).json({ message: "Title, description, and category are required" });
        }

        // Allow only predefined categories
        const allowedCategories = [
          "Music", "Education", "Gaming", "News", "Sports",
          "Entertainment", "Technology", "Other"
        ];

        if (!allowedCategories.includes(category)) {
          return res.status(400).json({ message: "Invalid category" });
        }

        // Extracted uploaded files
        const videoFile = req.files["video"]?.[0];
        const thumbnailFile = req.files["thumbnail"]?.[0];

        // Validate if both video and thumbnail are uploaded
        if(!videoFile || !thumbnailFile){
            return res.status(400).json({message: "Both video and thumbnail are required"})
        }

        // Get channel based on logged-in user
        const channel = await Channel.findOne({ userId: req.user.id });
        if (!channel) return res.status(404).json({ message: "Channel not found" });

        // Create new Video document with cloud URLs
        const newVideo = new Video({
            title,
            description,
            category,
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


//Fetch all videos
export const getAllVideos = async(req,res) =>{
    try {
        const videos = await Video.find().populate("channelId", "name avatar");
        res.status(200).json(videos);
    } catch (error) {
        console.error("Fetch Videos Error:", error);
        res.status(500).json({ message: "Failed to fetch videos" });
    }
}

//Get a single video by ID
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

//Increase view count
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


//Like video
export const likeVideo = async(req,res)=>{
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        const userId = req.user.id;

        if(video.likes.includes(userId)){
            video.likes.pull(userId); // remove like
        }else{
            video.likes.push(userId); // add like
            video.dislikes.pull(userId); // remove dislike
        }

        await video.save();
        res.status(200).json({ likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (error) {
        res.status(500).json({ message: "Failed to like video" });
    }
}


//Dislike video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user.id;

    // If already disliked, remove it
    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId);// remove dislike
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

// Update video details
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

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const channel = await Channel.findOne({ userId: req.user.id });
    if (!channel || String(channel._id) !== String(video.channelId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await video.deleteOne();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete Video Error:", error);
    res.status(500).json({ message: "Failed to delete video" });
  }
};
