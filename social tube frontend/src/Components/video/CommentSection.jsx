import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getVideoComments } from "../../features/commentFeatures/commentThunks";
import { getTotalCommentLikes } from "../../features/likeFeatures/likeThunk";

export default function CommentSection({videoId}) {
  const [active, setActive] = useState(false);

  const [ userComment, setUserComment] = useState("");

  const commentObj = useSelector((state) => state.comment.commentObj);
  const AllComments = useSelector((state) => state.comment.ALLComments);
  const user = useSelector((state) => state.user.user);
  const commentLike = useSelector((state) => state.like.commentLike);


  const [visibleComments, setVisibleComments] = useState(1);

  const dispatch = useDispatch();


  useEffect(() => {

    if(videoId){

      dispatch(getVideoComments(videoId))
      
    }
    
  } , [videoId])
  
  useEffect(() =>{
    
    dispatch(getTotalCommentLikes(videoId))
  } , [videoId , AllComments.length])



  const handelCommentSubmit = (e) => {
    e.preventDefault();
   
    dispatch(addComment({videoId , content: {content: userComment}}))
  }

  useEffect(() => {

    if(commentObj) {

      setUserComment("");
      setActive(false);


      
    }

  } , [commentObj])


  const handelShowMoreComments = () => {
  
    if(visibleComments >= AllComments.length){
      setVisibleComments(1);
    }
    else{
      setVisibleComments((prev) => prev +5);
    }

  }


  return (
    <div className="w-full flex flex-col gap-6 mt-3">

      {/* Comment Count */}
      <h2 className="text-white text-lg font-semibold">
        {AllComments.length} Comments
      </h2>

      {/* Add Comment Section */}
      <div className="flex gap-4">

        {/* Avatar */}
        <img
          src={user?.avatar || "https://i.pinimg.com/736x/b0/8e/19/b08e19da8ac6cec9cc3630d4b79893a0.jpg"}
          alt="your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Input + Buttons */}
        <div className="flex flex-col flex-1">

          <input
            type="text"
            placeholder="Add a comment..."
            value={userComment}
            onFocus={() => setActive(true)}
            onChange={(e) => setUserComment(e.target.value)}
            className="
              bg-transparent
              border-b border-zinc-700
              text-white
              text-sm
              pb-2
              outline-none
              focus:border-white
              transition
            "
          />

          {/* Buttons appear when active */}
          {active && (
            <div className="flex justify-end gap-3 mt-3">

              <button
                onClick={() => setActive(false) }
                className="px-4 py-1.5 text-sm text-white hover:bg-zinc-800 rounded-2xl transition"
              >
                Cancel
              </button>

              <button className="px-4 py-1.5 text-sm bg-white text-black rounded-2xl hover:bg-zinc-200 active:scale-95 transition"
              onClick={(e) => handelCommentSubmit(e) }>
                Comment
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-8 ">

        {AllComments.slice(0, visibleComments).map( (comment) => (<CommentCard key={comment._id} comment={comment} commentLike={commentLike?.[comment._id]} ></CommentCard>))}

      </div>

      {/* Show More Button */}

      <button 
      className="text-sm text-white font-medium mt-2 w-fit ml-auto mr-2 hover:text-zinc-300 transition cursor-pointer"
      onClick={handelShowMoreComments}>
        {AllComments.length >1 ?(visibleComments >= AllComments.length ? "show less" : "show more") : "no more comments"}
      </button>

    </div>
  );
}