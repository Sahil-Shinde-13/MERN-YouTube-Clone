

function VideoCard({video}) {
  return (
    <div className="bg-white rounded shadow hover:shadow-md transition-all">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover rounded-t" />
        <div className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
            <p className="text-xs text-gray-600">{video.channelId}</p>
            <p className="text-xs text-gray-500">{video.views} views</p>
        </div>
    </div>
  )
}

export default VideoCard