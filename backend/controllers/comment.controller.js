import Comment from "../models/Comment.model.js";


// Get all comments for a video
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "username avatar") // populate user info
      .sort({ createdAt: -1 }); // latest first
    res.status(200).json(comments);
  } catch (error) {
    console.error("Fetch Comments Error:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// Add a new comment to a video (protected)
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const newComment = new Comment({
      videoId: req.params.videoId,
      userId: req.user.id,
      text,
    });

    await newComment.save();

    // Populate user details before sending back
    await newComment.populate("userId", "username avatar");

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// Edit a comment (protected, only owner)
export const editComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check ownership
    if (comment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to edit this comment" });

    // Update and save
    comment.text = text || comment.text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error("Edit Comment Error:", error);
    res.status(500).json({ message: "Failed to edit comment" });
  }
};

// Delete a comment (protected, only owner)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check ownership
    if (comment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to delete this comment" });

    // Delete
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
