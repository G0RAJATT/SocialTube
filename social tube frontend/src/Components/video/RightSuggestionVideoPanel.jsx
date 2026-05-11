import { useDispatch, useSelector } from "react-redux";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { useEffect } from "react";
import { getAllVideos } from "../../features/videoFeatures/videoThunks";


export default function RightVideoSuggestionPanel() {


  const AllVideos = useSelector( (state) => state.video.AllVideos);
  const suggestionVideos = AllVideos.slice(0, 10); // Get the first 10 videos for suggestions

  const dispatch = useDispatch();
 
  useEffect( () => {

    if(AllVideos.length === 0){
      dispatch(getAllVideos(1));
    }
    
  },[]
)



  return (
    <div className="w-full max-w-95 flex flex-col gap-5">

      {/* Suggestions List */}
    
    {suggestionVideos.map( (video) => (<SuggestionVideoCard key={video._id} video={video}></SuggestionVideoCard>))}
     
    </div>
  );
}