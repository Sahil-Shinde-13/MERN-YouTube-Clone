import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";

function WatchVideo() {

    const {id} = useParams();
    const [video,setVideo] = useState(null);
    const [error,setError] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

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
            } catch (error) {
                setError("Video not found or failed to load");
            }
        };
        fetchVideo();
    },[id, user._id]);

    const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/videos/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      const res = await axios.put(
        `http://localhost:5000/api/videos/${id}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikeCount(res.data.likes);
      setDislikeCount(res.data.dislikes);
      setUserDisliked(!userDisliked);
      if (userLiked) setUserLiked(false);
    } catch (err) {
      console.error("Dislike failed:", err);
    }
  };


    if (error) return <div className="p-4 text-red-500 text-center mt-10">{error}</div>;
  if (!video) return <div className="p-4 text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mt-10 mx-auto">
        <div className="w-full aspect-video mb-4">
            <video src={video.videoUrl} className="w-full h-full" controls autoPlay></video>
        </div>
        <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">
            <div>
            <span className="mr-4">{video.views} views</span>
            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
            </div>
        
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
    </div>
  )
}

export default WatchVideo