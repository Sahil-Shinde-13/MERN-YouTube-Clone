import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the channel
  subscribers: { type: Number, default: 0 },
  subscribedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Who subscribed to this channel
  createdAt: { type: Date, default: Date.now }
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;