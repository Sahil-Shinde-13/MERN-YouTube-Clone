import mongoose from "mongoose";



const videoSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    videoUrl: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    uploadDate: { type: Date, default: Date.now },
    category: {type: String, required: true, enum: ["Music", "Education", "Gaming", "News", "Entertainment", "Technology", "Other"]}
  },
  { 
    timestamps: true
  }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;