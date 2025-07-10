    import axios from "axios";
    import { useEffect } from "react";
    import { useState } from "react"
    import VideoCard from "../components/VideoCard";
    import { useLocation, useNavigate } from "react-router-dom";


    function Home() {

        const [videos,setVideos] = useState([]);
        const [selectedCategory, setSelectedCategory] = useState("All");
        const [searchTerm, setSearchTerm] = useState("");

        const location = useLocation();
        const navigate = useNavigate();

        const categories = ["All", "Music", "Education", "Gaming", "News", "Sports", "Entertainment", "Technology", "Other"];

        useEffect(()=>{
            if(location.state?.searchTerm){
                setSearchTerm(location.state.searchTerm.toLowerCase());
                navigate(location.pathname, {replace: true});
            }
        },[location,navigate]);


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

        const filteredVideos = videos.filter((video) => {
            const matchesSearch = video.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
             return matchesSearch && matchesCategory;
        });


    return (
        <div className="p-10 mt-5 bg-gray-100 min-h-screen">

            {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition 
                                ${selectedCategory === cat
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                                {cat}
                         </button>
                    ))}
                </div>

            <h2 className="text-2xl font-bold mb-4">
                {searchTerm ? `Search Results for "${searchTerm}"` 
                            : selectedCategory !== "All" 
                            ? `Showing "${selectedCategory}" Videos` 
                            : "Recommended Videos"}
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
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