import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"


function PublicChannelPage() {

    const {id} = useParams();
    const[channel,setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(channel?.subscribers || 0);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        setIsSubscribed(channel?.subscribedUsers?.includes(user._id));
        setSubscriberCount(channel?.subscribers);
    }, [channel]);

    const handleSubscribe = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/channels/${id}/subscribe`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

            setIsSubscribed(res.data.subscribed);
            setSubscriberCount(res.data.subscribers);
        } catch (error) {
            console.error("Subscription failed", error);
        }
    };
    
    useEffect(()=>{
        const fetchChannel = async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/channels/${id}`);
                setChannel(res.data);
            } catch (error) {
                setError("Channel not found");
            }
        }

        const fetchChannelVideos = async()=>{
            try {
                const res = await axios.get("http://localhost:5000/api/videos");
                const filtered = res.data.filter((v) => v.channelId._id === id);
                setVideos(filtered);
            } catch (error) {
                setError("Failed to fetch videos");
            }
        }
        fetchChannel();
        fetchChannelVideos();
    },[id])

    if (error) return <div className="p-4 mt-10 text-red-500 text-center">{error}</div>;
    if (!channel) return <div className="p-4 mt-10 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto mt-20">
      <div className="flex items-center gap-4 mb-6 border p-4 rounded shadow-sm bg-white">
        <img src={channel.avatar || "default-avatar-url"} alt="avatar"
          className="w-20 h-20 rounded-full border object-cover"/>
        <div>
          <h2 className="text-2xl font-bold">{channel.name}</h2>
          <p className="text-sm text-gray-500">{channel.subscribers} subscribers</p>
        </div>
        <button onClick={handleSubscribe}
            className={`px-4 py-2 rounded ${isSubscribed ? "bg-gray-400" : "bg-blue-600 text-white"} hover:opacity-90`}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
        <p className="text-sm text-gray-500">{subscriberCount} subscribers</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Channel Videos</h3>

      {videos.length === 0 ? (
        <p className="text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((video) => (
            <div key={video._id} className="border rounded shadow-sm p-3 bg-white">
              <video src={video.videoUrl} className="w-full rounded mb-2" controls style={{ height: "160px", objectFit: "cover" }} />
              <h4 className="text-sm font-semibold mb-1">{video.title}</h4>
              <p className="text-xs text-gray-500">{video.views} views · {new Date(video.uploadDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PublicChannelPage