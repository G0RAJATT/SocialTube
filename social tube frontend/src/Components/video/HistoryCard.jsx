
import { Link } from "react-router-dom";

function HistoryCard({ video }) {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="flex gap-4 p-4 rounded-lg hover:bg-neutral-800 transition cursor-pointer">

        {/* Thumbnail */}
        <div className="relative w-80 h-44 shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Duration */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-1 rounded text-white">
              {Math.trunc( video.duration * 100 ) /100}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-start max-w-2xl">

          {/* Title */}
          <h2 className="text-lg font-semibold text-white leading-snug line-clamp-2">
            {video.title}
          </h2>

          {/* Channel + Views */}
          <div className="flex items-center text-sm text-gray-400 mt-2 gap-2">
            <span>{video.owner?.username}</span>
            <span>•</span>
            <span>{video.views} views</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
            {video.description}
          </p>

        </div>
      </div>
    </Link>
  );
}

export default HistoryCard;