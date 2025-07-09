import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (err) {
        setError("Failed to load video data");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/videos/${id}`, {title,description,}, {headers: { Authorization: `Bearer ${token}` },});
      alert("Video updated successfully");
      navigate("/channel");
    } catch (err) {
      setError("Failed to update video");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-24 p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Edit Video</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" rows="4"></textarea>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          {loading ? "Updating..." : "Update Video"}
        </button>
      </form>
    </div>
  );
}

export default EditVideo;
