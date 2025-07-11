    import axios from "axios";
    import { useEffect } from "react";
    import { useState } from "react"
    import VideoCard from "../components/VideoCard";
    import { useLocation, useNavigate } from "react-router-dom";


    function Home() {

        const [videos,setVideos] = useState([]); //holds all video data coming from backend
        const [selectedCategory, setSelectedCategory] = useState("All"); //curent selected category
        const [searchTerm, setSearchTerm] = useState(""); //search query

        const location = useLocation();
        const navigate = useNavigate();

        const categories = ["All", "Music", "Education", "Gaming", "News", "Sports", "Entertainment", "Technology", "Other"];

        // Check if a search term was passed from another route
        useEffect(()=>{
            if(location.state?.searchTerm){
                setSearchTerm(location.state.searchTerm.toLowerCase());
                navigate(location.pathname, {replace: true});
            }
        },[location,navigate]);


        // Fetch all videos from backend on first render
        useEffect(()=>{
            const fetchVideos = async()=>{
                try {
                    const res = await axios.get("http://localhost:5000/api/videos");
                    setVideos(res.data);
                } catch (error) {
                    console.log("Failed to fetch videos", error);
                }
            };
            fetchVideos();
        },[]);

        // Filter videos based on search and selected category
        const filteredVideos = videos.filter((video) => {
            const matchesSearch = video.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
             return matchesSearch && matchesCategory;
        });


    return (
        <div className="p-10 mt-5 bg-gray-100 min-h-screen">
          <div className="mb-6">
          {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-wrap gap-3">
              {categories.map((cat) => (
                 <button key={cat} onClick={() => setSelectedCategory(cat)} 
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition ${
                    selectedCategory === cat
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                    {cat}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
              <div className="sm:hidden flex justify-center">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-[90%] max-w-xs px-3 py-2 border rounded-md bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400">
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">
                {searchTerm ? `Search Results for "${searchTerm}"` 
                            : selectedCategory !== "All" 
                            ? `Showing "${selectedCategory}" Videos` 
                            : "Recommended Videos"}
            </h2>
            
            {/* Video grid */}
            <div className="flex flex-wrap justify-start gap-6">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => <VideoCard key={video._id} video={video} />)
                  ) : (
                    <div className="text-center text-gray-600">
                        {searchTerm ? (
                            <>
                             <p>
                                No videos found for "<span className="font-medium">{searchTerm}</span>"
                             </p>
                             <button onClick={() => setSearchTerm("")}
                                className="mt-4 px-4 cursor-pointer py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                Clear Search
                             </button>
                            </>
                        ) : (
                            <p>No videos found in this category.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )}

    export default Home