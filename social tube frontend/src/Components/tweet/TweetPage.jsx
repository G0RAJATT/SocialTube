import { useDispatch, useSelector } from "react-redux"
import TweetCard from "./TweetCard"
import { useEffect } from "react"
import { getAllTweets } from "../../features/tweetFeatures/tweetThunks";


function TweetPage() {

    const AllTweets = useSelector((state) => state.tweet.AllTweets)
    const dispath = useDispatch();

    useEffect(()=>{

        dispath(getAllTweets({Empty: {empty:""}}))

        
    },[])

  return (
    <>

    {AllTweets.map((tweet) => (<TweetCard key={tweet._id} tweet={tweet}></TweetCard>))}

    </>
  )
}

export default TweetPage
