import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import RightVideoSuggestionPanel from "./RightSuggestionVideoPanel";
import VideoBox from "./VideoBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAVideo, increaseViewCount } from "../../features/videoFeatures/videoThunks";
import PlaylistVideoSection from "../playlist/PlaylistVideoSection";
import { getPlaylistById } from '../../features/playlistFeatures/playlistThunk';


export default function VideoPage() {


  const { videoId, playlistId } = useParams();
  const videoObj = useSelector((state) => state.video.videoObj)
  const playlistObj = useSelector((state) => state.playlist.playlistObj);

  console.log("playlist obj" , playlistObj);
  

  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(getAVideo(videoId))

  }, [videoId, dispatch])

  useEffect(() => {

    const viewed = sessionStorage.getItem(`viewed-${videoId}`);

    if (!viewed) {



      const timer = setTimeout(() => {

        dispatch(increaseViewCount(videoId));
        sessionStorage.setItem(`viewd-${videoId}`, "true");

      }, (6 * 1000)) // 10 seconds timer before counting a view

      return () => clearTimeout(timer);
    }
  }, [videoId])


  useEffect(() => {

    dispatch(getPlaylistById(playlistId));

    if (playlistObj) {
      console.log("PlaylistObj : ", playlistObj);

    }

  }, [])

  const currentIndex = playlistObj?.[0]?.videos?.findIndex(v => v._id === videoObj?._id);
  const nextVideo = playlistObj?.[0]?.videos?.[currentIndex + 1]?._id;



  return (
    <div className="w-full bg-black min-h-screen">

      {/* Main Container */}
      <div className="max-w-390 mx-auto px-0 pt-5 pb-10">

        <div className="flex flex-col gap-4 items-start md:flex-row">

          {/* Left Section (Video + Comments) */}
          <div className="flex-1 flex flex-col gap-2">

            <VideoBox video={videoObj} nextVideo={nextVideo} playlistObj={playlistObj}></VideoBox>

            <div className="p-2">
              <CommentSection videoId={videoObj?._id}></CommentSection>
            </div>
          </div>


          {/* Right Section (Suggestions) */}
          <div className="w-90 shrink-0 flex flex-col gap-4">

            {playlistId && playlistId!= undefined && (
              <div className="bg-black border border-zinc-800 rounded-xl flex flex-col max-h-105 ">

                {/* Header */}
                <div className="px-3 py-1 border-zinc-800 text-white text-sm font-medium">
                  Playlist
                </div>

                {/* Scrollable videos */}
                <div className="flex-1 overflow-y-auto p-2 custom-scroll">
                  <PlaylistVideoSection playlistObj={playlistObj} />
                </div>

              </div>
            )}

            <RightVideoSuggestionPanel />

          </div>
        </div>

      </div>

    </div>
  );
}