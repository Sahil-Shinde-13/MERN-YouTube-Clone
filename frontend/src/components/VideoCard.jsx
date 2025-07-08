

function VideoCard({video}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition-all" style={{width: "100%", maxWidth: "360px"}}>
        <div className="relative w-full pt-[56.25%] rounded-t overflow-hidden">  
        <img src={video.thumbnailUrl} alt={video.title} className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
            <p className="text-xs text-gray-600">{video.channelId}</p>
            <p className="text-xs text-gray-500">{video.views} views</p>
        </div>
    </div>
  )
}

export default VideoCard