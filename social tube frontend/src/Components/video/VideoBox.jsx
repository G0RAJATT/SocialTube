import { useEffect, useState } from "react";
import { ThumbsUp, Share2, Bookmark } from "lucide-react";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAVideo } from "../../features/videoFeatures/videoThunks";
import { getTotalVideoLikes, toggleVideoLike } from "../../features/likeFeatures/likeThunk";
import { VscThumbsup, VscThumbsupFilled } from "react-icons/vsc";


export default function VideoBox({ video, nextVideo }) {
    const [showMore, setShowMore] = useState(false);

    const like = useSelector((state) => state.like.like);
    const {videoId} = useParams();

    const {playlistId} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log("video:" , video);
    


    useEffect(() => {

      
        dispatch(getTotalVideoLikes(videoId))
       

    } , [videoId])

    const handelVideoLike = async (e) => {

        e.preventDefault();

        console.log("video", video?._id);


        dispatch(toggleVideoLike({ videoId: video?._id }))

    }


    return (
        <div className="w-full flex flex-col gap-4">

            {/* 🎥 Video Section */}
            <div className="w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden">
                {/* Video element placeholder */}
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
                    <video
                        src={video?.videoFile}   // <-- place your video URL variable here
                        controls
                        autoPlay
                        
                        className="w-full h-full object-contain bg-black"
                        onEnded={() => {
                            console.log(nextVideo);
                            
                            if (nextVideo && playlistId) {
                                // Navigate(`/video/${nextVideo}/${playlistObj?._id}`)
                                navigate(`/video/${nextVideo}/${playlistId}`)
                                console.log("playlistId: " , playlistId);
                                
                            }

                            if (!nextVideo) return
                        }}
                    />
                </div>
            </div>

            {/* 📌 Title + Channel + Actions */}
            <div className="flex flex-col gap-4 pl-2 ">

                {/* Title */}
                <h1 className="text-white text-xl font-semibold leading-snug">
                    {video?.title}
                </h1>

                {/* Channel + Actions Row */}
                <div className="flex items-center justify-between flex-wrap gap-4">

                    {/* Left Section */}
                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <NavLink to={`/channel/${video?.owner?._id}`}>
                            <img
                                src={video?.owner?.avatar}
                                alt="channel avatar"
                                className="w-12 h-12 hover:opacity-80 transition rounded-full object-cover"
                            />
                        </NavLink>
                        {/* Channel Info */}
                        <div className="flex flex-col transition leading-tight">
                            <NavLink to={`/channel/${video?.owner?._id}`}>
                                <span className="text-white hover:text-zinc-300 font-medium text-sm">
                                    {video?.owner?.fullName}
                                </span>
                            </NavLink>
                            <span className="text-zinc-500 text-xs">
                                120K subscribers
                            </span>
                        </div>

                        {/* Subscribe Button */}
                        <button className="ml-4 bg-white text-black px-4 py-2 rounded-2xl text-sm font-medium hover:bg-zinc-200 active:scale-95 transition">
                            Subscribe
                        </button>

                    </div>

                    {/* Right Section (Actions) */}
                    <div className="flex items-center gap-3">

                        {/* Like Button */}
                        <button
                            onClick={(e) => (handelVideoLike(e))}
                            className={`text-white flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-700 px-4 py-2 rounded-2xl transition `}
                        >
                            <span
                                className={`flex items-center justify-center transition-all duration-300 ${like?.liked ? "scale-100" : "scale-90"
                                    }`}
                            >
                                {like?.liked ? (
                                    <VscThumbsupFilled size={18} />
                                ) : (
                                    <VscThumbsup size={18} />
                                )}
                            </span>

                            <span className="text-sm">{like?.likeCount || 0}</span>
                        </button>

                        {/* Share */}
                        <button className="text-white flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-700 px-4 py-2 rounded-2xl transition">
                            <Share2 size={18} />
                            <span className="text-sm">Share</span>
                        </button>

                        {/* Save */}
                        <button className="text-white flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-700 px-4 py-2 rounded-2xl transition">
                            <Bookmark size={18} />
                            <span className="text-sm">Save</span>
                        </button>

                    </div>
                </div>
            </div>

            {/* 📄 Description Section */}
        <div className="p-2">
            <div className="bg-zinc-900 rounded-2xl p-2 flex flex-col gap-3">

                {/* Views + Time */}
                <div className="text-sm text-zinc-400">
                    {video?.view} views • 2 days ago
                </div>

                {/* Description Text */}
                <p className={`text-sm text-zinc-300 whitespace-pre-line ${showMore ? "" : "line-clamp-1"
                    }`}>
                    {video?.description}

                </p>

                <div className={`flex items-center gap-3 mt-2 ${showMore ? "" : "hidden"}`}>
                    <NavLink to={`/channel/${video?.owner?._id}`}>
                        <img
                            src={video?.owner?.avatar}
                            alt="channel avatar"
                            className="w-10 h-10 hover:opacity-80 transition rounded-full object-cover"
                        />
                    </NavLink>
                    <div className="flex flex-col leading-tight">
                        <NavLink to={`/channel/${video?.owner?._id}`}>
                            <span className="text-white hover:text-zinc-300 transition text-sm font-medium">
                                {video?.owner?.fullName}
                            </span>
                        </NavLink>
                        <span className="text-zinc-500 text-xs">
                            120K subscribers
                        </span>
                    </div>

                </div>
                </div>

                {/* Channel Info (Repeated inside description bottom) */}


                {/* Show More / Less */}
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-sm text-white font-medium mt-2 w-fit hover:text-zinc-300 transition"
                >
                    {showMore ? "Show less" : "Show more"}
                </button>

            </div>

        </div>
    );
}