import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"


function Home() {

    const [videos,setVideos] = useState([]);

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


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Recommended Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                videos.map((video)=>{
                    <div key={video._id}>{video}</div>
                })
            }
        </div>
    </div>
  )
}

export default Home