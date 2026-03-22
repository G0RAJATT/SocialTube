import { useDispatch, useSelector } from 'react-redux'
import PlaylistCard from './PlaylistCard'
import { getUsersPlaylists } from '../../features/playlistFeatures/playlistThunk';
import { useEffect } from 'react';

function PlaylistPage() {

  const AllPlaylists = useSelector((state) => state.playlist.AllPlaylists);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    
     if(user)
     dispatch(getUsersPlaylists(user?.username));
 

  },[user , AllPlaylists.length])



  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 py-6">


      {AllPlaylists.map((playlist) => (<PlaylistCard key={playlist?._id} playlist={playlist} ></PlaylistCard>))}
        

    </div>
    
    
    </>
  )
}

export default PlaylistPage
