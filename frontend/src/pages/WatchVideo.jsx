import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function WatchVideo() {

    const {id} = useParams();
    const [video,setVideo] = useState(null);
    const [error,setError] = useState("");

    useEffect(()=>{
        const fetchVideo = async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/videos/${id}`)
                setVideo(res.data);
            } catch (error) {
                setError("Video not found or failed to load");
            }
        };
        fetchVideo();
    },[id]);

    if (error) return <div className="p-4 text-red-500 text-center mt-10">{error}</div>;
  if (!video) return <div className="p-4 text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-5xl mt-10 mx-auto">
        <div className="w-full aspect-video mb-4">
            <video src={video.videoUrl} className="w-full h-full" controls autoPlay></video>
        </div>
        <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-1">
            <span className="mr-4">{video.views} views</span>
            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
        </div>
        <p className="text-sm text-gray-700 mt-2">{video.description}</p>
    </div>
  )
}

export default WatchVideo