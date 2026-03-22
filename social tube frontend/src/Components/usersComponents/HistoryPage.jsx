import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserHistory } from "../../features/userFeatures/userThunks";
import { HistoryCard } from "..";


function HistoryPage() {

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();


  useEffect(()=>{

    dispatch(getUserHistory());

  },[])


  return (
    <>

    {user?.watchHistory?.map((video) => (<HistoryCard key={video._id} video={video}></HistoryCard>))}
        
   
 

    </>
  )
}

export default HistoryPage
