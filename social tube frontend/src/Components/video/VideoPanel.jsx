import { useDispatch, useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { useEffect } from "react";
import { getAllVideos } from "../../features/videoFeatures/videoThunks";


export default function VideoPanel() {


  const AllVideos = useSelector( (state) => state.video.AllVideos)
  const lastAction = useSelector( (state) => state.video.lastAction)

  const dispatch = useDispatch()

  useEffect(() => {

    const Empty = ""

    dispatch(getAllVideos(Empty))

  } , [])





  return (
    <div
      className="
       max-w-350 mx-auto flex-1 h-[calc(100vh-64px)] overflow-visible bg-black px-0 py-6 md:px-6"
    >
      {/* Video Grid */}
    <div
    className="
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 overflow-visible md:gap-x-6
    "
>
        {/* Temporary static cards */}

        { AllVideos.map((video) => ( <VideoCard video={video} key={video._id}></VideoCard>))}

       
        
      </div>
    </div>
  );
}