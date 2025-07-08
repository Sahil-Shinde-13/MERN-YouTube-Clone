    import axios from "axios";
    import { useEffect } from "react";
    import { useState } from "react"
    import VideoCard from "../components/VideoCard";


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
        <div className="p-10 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Recommended Videos</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {
                    videos.map((video)=>{
                    return <VideoCard key={video._id} video={video}/>
                    })
                }
            </div>
        </div>
    )
    }

    export default Home