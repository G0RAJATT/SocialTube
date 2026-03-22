import React, { useEffect } from 'react'
import LeftPanel from './LeftPanel'
import VideoPanel from '../video/VideoPanel'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlaylistModal } from '../../features/playlistFeatures/playlistSlice'
import PlaylistModal from '../playlist/PlaylistModal'

function HomePage() {

  const playlistModalOpen = useSelector((state) => state.playlist.playlistModalOpen);
  const AllPlaylists = useSelector((state) => state.playlist.AllPlaylists);
  const dispatch = useDispatch();


  return (
    <>

    <div className='flex'>
        <VideoPanel></VideoPanel>

         {playlistModalOpen && (
        <PlaylistModal
          playlists={AllPlaylists}
          onClose={() => dispatch(togglePlaylistModal())}
        />
      )}
        
    </div>

    
    </>
  )
}

export default HomePage
