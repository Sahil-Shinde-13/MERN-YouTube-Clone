import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChannelPage() {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/channels/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannel(res.data);
      } catch (err) {
        setError("Failed to fetch channel");
      }
    };

    const fetchMyVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos/my", {headers: { Authorization: `Bearer ${token}` },});
        setVideos(res.data);
      } catch (err) {
        setError("Failed to fetch videos");
      }
    };

    Promise.all([fetchChannel(), fetchMyVideos()]).finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {headers: { Authorization: `Bearer ${token}` },});
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (err) {
      alert("Failed to delete video");
    }
  };

  if (loading) return <p className="p-4 mt-10 text-center">Loading...</p>;
  if (error) return <p className="p-4 mt-10 text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto mt-20">
      {/* Channel Info */}
      <div className="flex items-center gap-4 mb-6 border p-4 rounded shadow-sm bg-white">
        <img src={channel?.avatar || "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
          alt="avatar"className="w-20 h-20 rounded-full border object-cover"/>
        <div>
          <h2 className="text-2xl font-bold">{channel?.name}</h2>
          <p className="text-sm text-gray-500">{channel?.subscribers} subscribers</p>
        </div>
        <button onClick={() => navigate("/upload")}className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Upload Video
        </button>
      </div>

      {/* My Videos */}
      <h3 className="text-xl font-semibold mb-4">My Uploaded Videos</h3>

      {videos.length === 0 ? (
        <p className="text-gray-500">You haven't uploaded any videos yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((video) => (
            <div key={video._id} className="border rounded shadow-sm p-3 bg-white">
              <video src={video.videoUrl}className="w-full rounded mb-2"controls
                style={{ height: "160px", objectFit: "cover" }}>
              </video>
              <h4 className="text-sm font-semibold mb-1">{video.title}</h4>
              <p className="text-xs text-gray-500 mb-2">{video.views} views · {new Date(video.uploadDate).toLocaleDateString()}</p>

              <div className="flex gap-2">
                <button onClick={() => navigate(`/edit-video/${video._id}`)} className="text-blue-500 cursor-pointer text-sm hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(video._id)}className="text-red-500 cursor-pointer text-sm hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChannelPage;
