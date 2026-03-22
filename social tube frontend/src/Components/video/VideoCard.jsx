import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAVideo } from "../../features/videoFeatures/videoThunks";
import { togglePlaylistModal } from "../../features/playlistFeatures/playlistSlice";
import { getUsersPlaylists } from "../../features/playlistFeatures/playlistThunk";
import { closeVideoMenu, openVideoMenu } from "../../features/videoFeatures/videoSlice"

export default function VideoCard({ video }) {


  const [videoId, setVideoId] = useState("");
  const [thumbnail, setThumbnail] = useState("https://via.placeholder.com/400x220");
  const [duration, setDuration] = useState("12:45");
  const [title, setTitle] = useState("This is a sample video title which can be long");
  const [channelName, setChannelName] = useState("Channel Name");
  const [channelId, setChannelId] = useState("123");
  const [views, setViews] = useState("1200");
  const [time, setTime] = useState("2 days ago");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/40");




  // const video = useSelector( (state) => state.video.videoObj)
  const lastAction = useSelector((state) => state.video.lastAction)
  const dispatch = useDispatch();


  useEffect(() => {


    if (video && lastAction) {
      

      //   setVideoId(video._id)
      setVideoId(video._id)
      setThumbnail(video.thumbnail)
      setDuration(Math.trunc(video.duration * 100) / 100)
      setTitle(video.title)
      setChannelName(video.owner.fullName)
      setChannelId(video.owner._id)
      setViews(video.view)
      setAvatar(video.owner.avatar)

      const created = new Date(video.createdAt)
      const now = new Date()

      const diffMs = now - created    // difference in milliseconds
      const hours = diffMs / (1000 * 60 * 60);
      const days = diffMs / (1000 * 60 * 60 * 24);
      const months = days / 30;
      const years = days / 365;

      if (hours < 24) {
        setTime(Math.trunc(hours) + " hours ago")
      }
      else if (days < 30) {
        setTime(Math.trunc(days) + " days ago")
      }
      else if (months < 12) {
        setTime(Math.trunc(months) + " months ago")
      }
      else {
        setTime(Math.trunc(years) + " years ago")
      }

    }

  }, [video])




  useEffect(() => {
    dispatch(getAVideo(videoId))

  }, [])


  const user = useSelector((state) => state.user.user);

  // useEffect(() => {

  //   if(user)
  //   dispatch(getUsersPlaylists({userId:user?._id}))

  // },[user])


  const handelSaveToPlaylist = (e) => {

    e.preventDefault();
    dispatch(togglePlaylistModal())
    const username = user?.username || "defaultUser";


    dispatch(getUsersPlaylists(username))

  }

  const openMenuVideoId = useSelector((state) => state.video.openMenuVideoId)


  const handelShowMenu = async (e) => {
    e.preventDefault();

    if(openMenuVideoId === video?._id){
      dispatch(closeVideoMenu())
    }
    else{
      dispatch(openVideoMenu(video._id))
    }

  }


  return (
    <div className={`w-full max-w-sm transition-transform duration-200 hover:-translate-y-1 relative ${openMenuVideoId === video?._id ? "z-50" : "z-0"}`}>

      {/* Thumbnail Section */}
      <NavLink to={`/video/${videoId}`}>
        <div className="relative rounded-xl overflow-hidden bg-zinc-900 group">

          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Duration Badge */}
          <span className="
            absolute bottom-2 right-2 
            bg-black/80 text-white text-xs 
            px-2 py-0.5 rounded-md
          ">
            {duration}
          </span>

        </div>
      </NavLink>

      {/* Video Info */}
      <div className="flex gap-3 mt-3 justify-between">

        {/* Avatar */}
        <NavLink to={`/channel/${channelId}`}>
          <img
            src={avatar}
            alt="channel avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </NavLink>

        {/* Title + Channel + Views */}
        <div className="flex flex-col flex-1">

          {/* Title */}
          <NavLink
            to={`/video/${videoId}`}
            className="text-white font-medium text-sm line-clamp-2 hover:text-zinc-300 transition"
          >
            {title}
          </NavLink>

          {/* Channel Name */}
          <NavLink
            to={`/channel/${channelId}`}
            className="text-zinc-400 text-sm hover:text-zinc-300 transition mt-1"
          >
            {channelName}
          </NavLink>

          {/* Views + Time */}
          <span className="text-zinc-500 text-xs mt-1">
            {video?.view.toLocaleString()} views • {time}
          </span>

        </div>

        {/* Three Dot Menu */}
        <div className="relative z-50">

          <button
            onClick={(e) => (handelShowMenu(e))}
            className="text-zinc-400 hover:text-white text-lg px-2 py-1 rounded-full hover:bg-zinc-800 transition"
          >
            ⋮
          </button>

          {openMenuVideoId === video?._id && (
            <div className="absolute right-0 top-7 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">

              <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-100 hover:bg-zinc-800 transition">
                Share
              </button>

              <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-100 hover:bg-zinc-800 transition">
                Download
              </button>

              <button
                className="w-full text-left px-4 py-2.5 text-sm text-zinc-100 hover:bg-zinc-800 transition"
                onClick={(e) => (handelSaveToPlaylist(e))}
              >
                Save to Playlist
              </button>

              <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-100 hover:bg-zinc-800 transition">
                Save
              </button>

            </div>
          )}

        </div>
      </div>



    </div>
  );
}

