import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../video/VideoCard";
import { use, useEffect } from "react";
import { getChannelProfile } from "../../features/userFeatures/userThunks";
import { useParams } from "react-router-dom";
import { Video } from "lucide-react";


export default function ChannelPage() {


    const user = useSelector( (state) => state.user.user)
    const dispatch = useDispatch();
    const {channelId} =  useParams()  // Assuming you are using react-router and the route is defined as /channel/:userId


    useEffect(()=>{
        
        dispatch(getChannelProfile({ userId : channelId }))

        if(user){
            console.log("\n\nUserProfile Details\n\n" , user);
            
        }

    },[])




  return (
    <div className="w-full bg-black min-h-screen text-white">

      {/* Channel Banner */}
      <div className="w-full h-40 md:h-56 bg-zinc-800">
        <img
          src={user?.coverImage || "https://api.dicebear.com/7.x/initials/svg?seed=ChannelBanner"}  // Use user's thumbnail or a default image
          alt="channel banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-start gap-6 py-6">

          {/* Avatar */}
          <img
            src={user?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=ChannelAvatar"}  // Use user's thumbnail or a default image
            alt="channel avatar"
            className="w-24 h-24 rounded-full"
          />

          {/* Channel Details */}
          <div className="flex flex-col gap-2">

            <h1 className="text-2xl font-semibold">
              {user?.fullName || "Channel Name"}
            </h1>

            <div className="text-sm text-zinc-400">
             {user?.username || "channelhandle"} • {user?.subscribersCount} subscribers • {user?.videos?.length || 0} videos
            </div>

            {/* <p className="text-sm text-zinc-300 max-w-xl">
              This is a sample channel description. Later you can show the real
              description from your backend here.
            </p> */}

          </div>

          {/* Subscribe Button */}
          <div className="ml-auto">
            <button className="px-5 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200">
              Subscribe
            </button>
          </div>

        </div>

        {/* Channel Tabs */}
        <div className="flex gap-6 border-b border-zinc-800 pb-2 text-sm font-medium">

          <button className="text-white border-b-2 border-white pb-2">
            Home
          </button>

          <button className="text-zinc-400 hover:text-white">
            Videos
          </button>

          <button className="text-zinc-400 hover:text-white">
            Posts
          </button>

          <button className="text-zinc-400 hover:text-white">
            Playlists
          </button>

          <button className="text-zinc-400 hover:text-white">
            About
          </button>

        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">

          {/* Static Video Cards (later replace with map) */}
         {user?.videos?.map((video) => (<VideoCard key={video._id} video={video}></VideoCard> ))}

        </div>

      </div>
    </div>
  );
}