import { useDispatch, useSelector } from "react-redux";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { useEffect } from "react";
import { getAllVideos } from "../../features/videoFeatures/videoThunks";


export default function RightVideoSuggestionPanel() {


  const AllVideos = useSelector( (state) => state.video.AllVideos);

  const dispatch = useDispatch();
 
  useEffect( () => {

    const Empty = "";

    dispatch(getAllVideos(Empty))
  },[]
)



  return (
    <div className="w-full max-w-95 flex flex-col gap-5">

      {/* Suggestions List */}
    
    {AllVideos.map( (video) => (<SuggestionVideoCard key={video._id} video={video}></SuggestionVideoCard>))}
     
    </div>
  );
}