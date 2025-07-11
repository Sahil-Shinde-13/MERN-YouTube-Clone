import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addComment, deleteComment, editComment, fetchComments } from "../redux/commentSlice";

function Comments({ videoId, user }) {
  const dispatch = useDispatch();
  const { list: comments, loading } = useSelector((state) => state.comments);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    dispatch(addComment({ videoId, text: newComment }));
    setNewComment("");
  };

  // Delete a comment
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  // Start editing a comment
  const handleEditComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  // Save edited comment
  const handleSaveEdit = () => {
    if (editingText.trim()) {
      dispatch(editComment({ commentId: editingCommentId, text: editingText }));
      setEditingCommentId(null);
      setEditingText("");
    }
  };

  const currentUserId = user?._id || user?.id;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* New Comment Input */}
      {user && (
        <form onSubmit={handleAddComment} className="mb-4 flex items-center gap-2">
          <input type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow border p-2 rounded bg-gray-100"/>
          <button type="submit" className="text-sm px-4 py-2 bg-neutral-800 text-white rounded hover:opacity-90">
            Comment
          </button>
        </form>
      )}

      {loading && <p className="text-gray-500">Loading comments...</p>}
      {!loading && comments.length === 0 && <p className="text-sm text-gray-500">No comments yet.</p>}

      {/* Comment List */}
      <ul className="space-y-5">
        {comments.map((comment) => (
          <li key={comment._id} className="border-b pb-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-800">{comment.userId?.username || "User"}</p>
              {(comment.userId?._id || comment.userId) === currentUserId && (
                <div className="flex gap-3 text-xs">
                  <button onClick={() => handleEditComment(comment._id, comment.text)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
                </div>
              )}
            </div>
            {editingCommentId === comment._id ? (
              <div className="mt-1 flex flex-col sm:flex-row gap-2">
                <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)}
                  className="border px-2 py-1 rounded flex-grow bg-gray-100"/>
                <button onClick={handleSaveEdit}
                  className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Save
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
