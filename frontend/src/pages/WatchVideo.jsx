import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, editComment, fetchComments } from "../redux/commentSlice";

function WatchVideo() {

    const dispatch = useDispatch();
    const { list: comments, loading: commentLoading } = useSelector((state) => state.comments);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const {id} = useParams();
    const [video,setVideo] = useState(null);
    const [error,setError] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchVideo = async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/videos/${id}`)
                setVideo(res.data);

                await axios.put(`http://localhost:5000/api/videos/${id}/views`);
                setLikeCount(res.data.likes.length);
                setDislikeCount(res.data.dislikes.length);

                setUserLiked(res.data.likes.includes(user._id));
                setUserDisliked(res.data.dislikes.includes(user._id));

                dispatch(fetchComments(id));
            } catch (error) {
                setError("Video not found or failed to load");
            }
        };
        fetchVideo();
    },[id, user._id]);

    const handleLike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${id}/like`,{},{ headers: { Authorization: `Bearer ${token}` } });
      setLikeCount(res.data.likes);
      setDislikeCount(res.data.dislikes);
      setUserLiked(!userLiked);
      if (userDisliked) setUserDisliked(false);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${id}/dislike`,{},{ headers: { Authorization: `Bearer ${token}` } });
      setLikeCount(res.data.likes);
      setDislikeCount(res.data.dislikes);
      setUserDisliked(!userDisliked);
      if (userLiked) setUserLiked(false);
    } catch (err) {
      console.error("Dislike failed:", err);
    }
  };

    const handleAddComment = async(e)=>{
        e.preventDefault();
        if (!newComment.trim()) return;
        dispatch(addComment({ videoId: id, text: newComment }));
        setNewComment("");
    }
    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId));
    };
    const handleEditComment = (commentId, currentText) => {
        setEditingCommentId(commentId);
        setEditingText(currentText);
    };
    const handleSaveEdit = () => {
        if (editingText.trim()) {
            dispatch(editComment({ commentId: editingCommentId, text: editingText }));
            setEditingCommentId(null);
            setEditingText("");
        }
    };

  if (error) return <div className="p-4 text-red-500 text-center mt-10">{error}</div>;
  if (!video) return <div className="p-4 text-center mt-10">Loading...</div>;

    const currentUserId = user?._id || user?.id;

  return (
    <div className="p-4 max-w-5xl mt-10 mx-auto">
        <div className="w-full aspect-video mb-4">
            <video src={video.videoUrl} className="w-full h-full" controls autoPlay></video>
        </div>
        <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">

            {video.channelId && (
                <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => navigate(`/channel/${video.channelId._id}`)}>
                  <img src={ video.channelId.avatar || "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                    alt="channel-avatar" className="w-10 h-10 rounded-full object-cover border"/>
                  <span className="font-medium text-gray-800 hover:underline">
                     {video.channelId.name}
                  </span>
                </div>
            )}
        
        <div className="flex gap-4">
            <button onClick={handleLike} className="flex items-center gap-1 hover:text-blue-600">
                {userLiked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
                {likeCount}
            </button>
            <button onClick={handleDislike} className="flex items-center gap-1 hover:text-red-500">
               {userDisliked ? <AiFillDislike size={18} /> : <AiOutlineDislike size={18} />}
               {dislikeCount}
          </button>
        </div>
        </div>
        <p className="text-sm text-gray-700 mt-2">{video.description}</p>

        {/* Comments Section */}
          <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Comments</h3>

  {/* Add new comment */}
  {user && (
    <form onSubmit={handleAddComment} className="mb-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Add a comment..."
        className="flex-grow border p-2 rounded"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
        Post
      </button>
    </form>
  )}

  {/* Loading */}
  {commentLoading && <p className="text-gray-500">Loading comments...</p>}

  {/* Comments list */}
  {comments.length === 0 && !commentLoading && (
    <p className="text-sm text-gray-500">No comments yet.</p>
  )}

  <ul className="space-y-4">
    {comments.map((comment) => { 
        console.log(comment);
      return <li key={comment._id} className="border-b pb-2">
        
        <div className="flex justify-between items-start">
          <p className="font-medium text-sm text-gray-800">{comment.userId?.username || "Unknown"}</p>
          {(comment.userId?._id || comment.userId) === currentUserId && (
            <div className="flex gap-2 text-xs">
              <button onClick={() => handleEditComment(comment._id, comment.text)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
            </div>
          )}
        </div>

        {editingCommentId === comment._id ? (
          <div className="mt-1 flex flex-col sm:flex-row gap-2">
            <input type="text" className="border px-2 py-1 rounded flex-grow"value={editingText}
              onChange={(e) => setEditingText(e.target.value)}/>
            <button onClick={handleSaveEdit} className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Save
            </button>
          </div>
        ) : (
          <p className="text-sm mt-1 text-gray-700">{comment.text}</p>
        )}
      </li>
})}
  </ul>
</div>

    </div>
  )
}

export default WatchVideo