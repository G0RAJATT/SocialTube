import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import VideoCard from '../video/VideoCard';
import SuggestionVideoCard from '../video/SuggestionVideoCard';

function PlaylistVideoSection({playlistObj}) {

    



  return (
 
         <div className="w-full max-w-95 flex flex-col gap-5">

           {playlistObj?.[0]?.videos?.map((video) => (<SuggestionVideoCard key={video._id} playlistObj = {playlistObj} video={video} />))}

         </div>
       
   
  )
}

export default PlaylistVideoSection
