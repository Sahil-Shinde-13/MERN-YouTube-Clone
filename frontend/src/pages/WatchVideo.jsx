import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {AiOutlineLike,AiFillLike,AiOutlineDislike,AiFillDislike} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { fetchComments } from "../redux/commentSlice";
import Comments from "../components/Comments";

function WatchVideo() {
  const { id } = useParams(); // video ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch video and comments on when video ID changes
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);

        // Set like/dislike and subscription status
        if (res.data.channelId && res.data.channelId.subscribedUsers) {
          setIsSubscribed(res.data.channelId.subscribedUsers.includes(user._id));
          setSubscriberCount(res.data.channelId.subscribers);
        }

        // Increment view count
        await axios.put(`http://localhost:5000/api/videos/${id}/views`);
        setLikeCount(res.data.likes.length);
        setDislikeCount(res.data.dislikes.length);
        setUserLiked(res.data.likes.includes(user._id));
        setUserDisliked(res.data.dislikes.includes(user._id));

        // Load comments
        dispatch(fetchComments(id));
      } catch (error) {
        setError("Video not found or failed to load");
      }
    };
    fetchVideo();
  }, [id, user._id]);

  // Subscribe or unsubscribe to channel
  const handleSubscribe = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/channels/${video.channelId._id}/subscribe`,{},{ headers: { Authorization: `Bearer ${token}`}});
      setIsSubscribed(res.data.subscribed);
      setSubscriberCount(res.data.subscribers);
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };

  // Like video
  const handleLike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${id}/like`,{},{ headers: { Authorization: `Bearer ${token}`}});
      setLikeCount(res.data.likes);
      setDislikeCount(res.data.dislikes);
      setUserLiked(!userLiked);
      if (userDisliked) setUserDisliked(false);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  // Dislike video
  const handleDislike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${id}/dislike`,{},{ headers: { Authorization: `Bearer ${token}`}});
      setLikeCount(res.data.likes);
      setDislikeCount(res.data.dislikes);
      setUserDisliked(!userDisliked);
      if (userLiked) setUserLiked(false);
    } catch (err) {
      console.error("Dislike failed:", err);
    }
  };

  if (error)
    return <div className="p-4 text-red-500 text-center mt-10">{error}</div>;
  if (!video) return <div className="p-4 text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mt-10 mx-auto">

      {/* Video Player */}
      <div className="w-full aspect-video mb-4">
        <video src={video.videoUrl} className="w-full h-full" controls autoPlay>
        </video>
      </div>

      <h2 className="text-xl font-semibold mb-2">{video.title}</h2>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b pb-4">
          
          {/* Channel Info + Subscribe */}
          <div className="flex items-center gap-4">
            {video.channelId && (
              <div className="flex items-center gap-3 cursor-pointer"onClick={() => navigate(`/channel/${video.channelId._id}`)}>
                <img src={video.channelId.avatar || "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                  alt="channel-avatar" className="w-11 h-11 rounded-full object-cover border"/>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 hover:underline">
                    {video.channelId.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {subscriberCount} subscribers
                  </span>
                </div>
              </div>
            )}

            {/* Subscribe Button */}
            <button onClick={handleSubscribe}
              className={`ml-4 px-4 py-1 rounded-full text-sm font-medium border transition ${
                isSubscribed
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-black text-white hover:bg-gray-900"
              }`}>
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>

          {/* Like / Dislike Buttons */}
          <div className="flex gap-4 items-center text-gray-700">
            <button onClick={handleLike}
              className="flex items-center gap-1 hover:text-black transition">
              {userLiked ? (<AiFillLike size={20} />) : (<AiOutlineLike size={20} />
              )}
              <span className="text-sm">{likeCount}</span>
            </button>

            <button onClick={handleDislike}
              className="flex items-center gap-1 hover:text-black transition">
              {userDisliked ? (
                <AiFillDislike size={20} />
              ) : (
                <AiOutlineDislike size={20} />
              )}
              <span className="text-sm">{dislikeCount}</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-6">{video.description}</p>

      {/* Comments Component */}
      <Comments videoId={id} user={user} />
    </div>
  );
}

export default WatchVideo;
