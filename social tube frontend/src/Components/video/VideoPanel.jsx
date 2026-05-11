import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllVideos } from "../../features/videoFeatures/videoThunks";
import VideoCard from "./VideoCard";


export default function VideoPanel() {


  const AllVideos = useSelector( (state) => state.video.AllVideos)
  const loading = useSelector( (state) => state.video.loading)
  const hasMore = useSelector( (state) => state.video.hasMore) 
  const currentPage = useSelector( (state) => state.video.currentPage)

  const [page , setPage] = useState(1);

  const dispatch = useDispatch()

  useEffect(() => {

    const Empty = ""

    if(AllVideos.length === 0 ) {
    dispatch(getAllVideos(1))
    }

  } , [page])

  const observer = useRef();

  const lastVideoRef = useCallback( node => {

    if(loading || !hasMore) return;

    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver( entries => {

      if(entries[0].isIntersecting && hasMore){
        setPage(prevPage => prevPage + 1);
        dispatch(getAllVideos(page));
      }
    })

    if(node) {
      observer.current.observe(node);
    }
  },[loading , hasMore , page])





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

        { AllVideos.map((video , index) => {

          if(AllVideos.length === index + 1){

            return <VideoCard ref={lastVideoRef} key={video._id} video={video} />
          }

          return <VideoCard key={video._id} video={video} />
        })}

       
        
      </div>
    </div>
  );
}