import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title || !description || !video || !thumbnail) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await axios.post("http://localhost:5000/api/videos/upload", formData, {headers: {Authorization: `Bearer ${token}`,"Content-Type": "multipart/form-data",},});
      alert("Video uploaded successfully!");
      navigate("/channel");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload Your Video</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Video Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
          <input type="text" placeholder="Enter video title" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"/>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea placeholder="Write a brief description..." rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
          </textarea>
        </div>

        {/* Video File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video File</label>
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}
            className="w-full file:border-0 file:rounded-md file:bg-blue-100 file:text-blue-700 file:font-semibold border border-dashed border-gray-300 p-2 rounded cursor-pointer"/>
        </div>

        {/* Thumbnail File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full file:border-0 file:rounded-md file:bg-green-100 file:text-green-700 file:font-semibold border border-dashed border-gray-300 p-2 rounded cursor-pointer"/>
        </div>

        {/* Upload Button */}
        <button type="submit" disabled={loading}
          className={`w-full py-3 rounded-md cursor-pointer text-white font-semibold transition duration-200 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;
