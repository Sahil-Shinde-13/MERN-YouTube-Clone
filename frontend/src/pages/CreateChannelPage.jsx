import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreateChannelPage() {
const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");//get jwt token

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    // Handle form submission
    if (!name.trim()) {
      setError("Channel name is required");
      return;
    }
    // API call to ceate channel
      try {
        await axios.post("http://localhost:5000/api/channels",{ name, avatar },{ headers: { Authorization: `Bearer ${token}` } });
        navigate("/channel");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to create channel");
      }
  };



  return (
    <div className="p-4 max-w-xl mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Channel</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" placeholder="Channel name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"/>
        <input type="text" placeholder="Avatar URL (optional)" value={avatar} onChange={(e) => setAvatar(e.target.value)}
          className="w-full p-2 border rounded"/>
          <p>Want a ready avatar URL? <a className="cursor-pointer hover:text-blue-400" target="_blank" href="https://vinicius73.github.io/gravatar-url-generator/#/">click here</a></p>
        <button type="submit" className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 w-full">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default CreateChannelPage;