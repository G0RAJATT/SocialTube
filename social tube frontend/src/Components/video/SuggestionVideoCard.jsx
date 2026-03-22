import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

export default function SuggestionVideoCard({video , playlistObj}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [time, setTime] = useState("");

  const { videoId , playlistId } = useParams();


  


  useEffect(() => {
     const created = new Date(video.createdAt)
      const now = new Date()

      const diffMs = now - created    // difference in milliseconds
      const hours = diffMs / (1000 * 60 * 60);
      const days = diffMs / (1000 * 60 * 60 * 24);
      const months =  days / 30;
      const years = days / 365;

      if(hours < 24){
        setTime(Math.trunc(hours) + " hours ago")
      }
      else if(days < 30){
        setTime(Math.trunc(days) + " days ago")
      }
      else if(months < 12){
        setTime(Math.trunc(months) + " months ago")
      }
      else{
        setTime(Math.trunc(years) + " years ago")
      }

  })




  return (
    <div className={`flex gap-3 w-full relative group ${videoId == video._id ? 'bg-zinc-800' : ''}`}>

      {/* Thumbnail */}
      <NavLink to={`${ playlistId ? `/video/${video._id}/${playlistId}`: `/video/${video._id}`}`} className="relative min-w-42">
        <div className="w-42 h-23.5 bg-zinc-900 rounded-xl overflow-hidden">
          <img
            src={video.thumbnail}
            alt="thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Duration */}
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
          {Math.trunc( video.duration * 100 ) /100 }
        </span>
      </NavLink>

      {/* Right Content */}
      <div className="flex flex-col flex-1">

        {/* Title + Menu */}
        <div className="flex justify-between items-start gap-2">

          <NavLink
            to={`${ playlistId ? `/video/${video._id}/${playlistId}`: `/video/${video._id}`}`}
            className="text-white text-sm font-medium leading-snug line-clamp-2 hover:text-zinc-300 transition"
          >
            {video.title}
          </NavLink>

          {/* Three Dots */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-zinc-400 hover:text-white transition"
          >
            <MoreVertical size={18} />
          </button>

        </div>

        {/* Channel Name */}
        <NavLink
          to={`/channel/${video?.owner?._id}`}
          className="text-zinc-400 text-xs mt-1 hover:text-zinc-300 transition"
        >
          {video.owner.fullName}
        </NavLink>

        {/* Views + Time */}
        <span className="text-zinc-500 text-xs mt-0.5">
          {video.view} views • {time}
        </span>

      </div>

      {/* Dropdown Menu */}
      {openMenu && (
        <div className="absolute top-8 right-0 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg w-48 py-2 z-50">

          <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 transition">
            Share
          </button>

          <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 transition">
            Save to playlist
          </button>

          <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 transition">
            Download
          </button>

          <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 transition">
            Watch later
          </button>

        </div>
      )}

    </div>
  );
}