import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'

import {
  AuthUserForm,
  HomePage,
  PublishAVideo,
  RegisterUserForm,
  VideoPage,
  PostTweet,
  ChannelPage,
  TweetPage,
  HistoryPage
} from './Components'
import LayoutWithoutLeftPannel from './LayoutWithoutLeftPannel'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from './features/userFeatures/userThunks'
import PlaylistPage from './Components/playlist/PlaylistPage'


function App() {


  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getCurrentUser());

  },[])


  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage />} />
          <Route path='/upload-video' element={<PublishAVideo></PublishAVideo>} />
          <Route path='/create-post' element={<PostTweet></PostTweet>} />
          <Route path='/tweets/all-tweets' element = {<TweetPage></TweetPage>} />
          <Route path='/history' element={<HistoryPage></HistoryPage>}/>
          <Route path='/playlists' element ={<PlaylistPage></PlaylistPage>}/>

        </Route>

        <Route element={<LayoutWithoutLeftPannel></LayoutWithoutLeftPannel>}>

          <Route path='video/:videoId' element={<VideoPage />} />
          <Route path='video/:videoId/:playlistId' element={<VideoPage />} />
          <Route path='register' element={<RegisterUserForm></RegisterUserForm>} />
          <Route path='login' element={<AuthUserForm></AuthUserForm>} />
          <Route path='sign-in' element={<AuthUserForm></AuthUserForm>} />
          <Route path='channel/:channelId' element={<ChannelPage></ChannelPage>} />
          <Route />
          <Route />
          <Route />

        </Route>

      </Routes>


    </>
  )
}

export default App
