import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../video/VideoCard";
import { use, useEffect, useState } from "react";
import { getChannelProfile } from "../../features/userFeatures/userThunks";
import { useParams } from "react-router-dom";
import { Video } from "lucide-react";
import { isUserSubscribed, toggleSubscription } from "../../features/subscription/subscriptionThunk";


export default function ChannelPage() {


    const user = useSelector( (state) => state.user.user)
    const channel = useSelector( (state) => state.user.channel);
    const dispatch = useDispatch();
    const {channelId} =  useParams()  // Assuming you are using react-router and the route is defined as /channel/:userId
    
    const subscription = useSelector( (state) => state.subscription.subscription)
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(()=>{
        
        dispatch(getChannelProfile({ userId : channelId }))
        dispatch(isUserSubscribed({userId: user?._id , channelId}))

        if(channel){
            console.log("\n\nUserProfile Details\n\n" , channel);
            
        }


    },[])


    useEffect(() => {

      if(subscription){
        setIsSubscribed(subscription.isSubscribed);
      }
      
    } , [subscription , dispatch])

    const handelSubscribe = () => {
      // Check if user is authenticated before allowing subscription
      if(!user){
        alert("Please log in to subscribe to channels.");
        return;
      }
      dispatch(toggleSubscription(channelId));
    

    }
      

  return (
    <div className="w-full bg-black min-h-screen text-white">

      {/* Channel Banner */}
      <div className="w-full h-40 md:h-56 bg-zinc-800">
        <img
          src={channel?.coverImage || "https://api.dicebear.com/7.x/initials/svg?seed=ChannelBanner"}  // Use user's thumbnail or a default image
          alt="channel banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-start gap-6 py-6">

          {/* Avatar */}
          <img
            src={channel?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=ChannelAvatar"}  // Use user's thumbnail or a default image
            alt="channel avatar"
            className="w-24 h-24 rounded-full"
          />

          {/* Channel Details */}
          <div className="flex flex-col gap-2">

            <h1 className="text-2xl font-semibold">
              {channel?.fullName || "Channel Name"}
            </h1>

            <div className="text-sm text-zinc-400">
             {channel?.username || "channelhandle"} • {channel?.subscribersCount} subscribers • {channel?.videos?.length || 0} videos
            </div>

            {/* <p className="text-sm text-zinc-300 max-w-xl">
              This is a sample channel description. Later you can show the real
              description from your backend here.
            </p> */}

          </div>

          {/* Subscribe Button */}
          <div className="ml-auto">
            <button 
            className="px-5 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200"
            onClick={handelSubscribe}
            >
             { isSubscribed ? "subscribed" : "Subscribe"}
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
         {channel?.videos?.map((video) => (<VideoCard key={video._id} video={video}></VideoCard> ))}

        </div>

      </div>
    </div>
  );
}