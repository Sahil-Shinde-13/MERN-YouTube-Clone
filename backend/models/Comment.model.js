import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true }, // Video the comment belongs to
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Author of the comment
  text: { type: String, required: true, trim: true },
}, {
  timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;