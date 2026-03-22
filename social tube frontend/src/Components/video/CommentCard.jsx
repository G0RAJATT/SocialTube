import { ThumbsUp, MoreVertical } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTotalCommentLikes, toggleCommentLike } from "../../features/likeFeatures/likeThunk";
import { VscThumbsup, VscThumbsupFilled } from "react-icons/vsc";

export default function CommentCard({ comment , commentLike }) {


  const dispatch = useDispatch();


  const handelCommentLike = async (e) => {

    e.preventDefault();
    const commentId = comment?._id;

    dispatch(toggleCommentLike(commentId));
  }



  return (
    <div className="flex gap-4 w-full">

      {/* Avatar */}
      <NavLink to={`/channel/123`}>
        <img
          src={comment?.owner?.avatar}
          alt="user avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </NavLink>

      {/* Right Content */}
      <div className="flex flex-col flex-1 gap-2">

        {/* Username + Time + Menu */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <NavLink
              to={`/channel/123`}
              className="text-white text-sm font-medium hover:text-zinc-300 transition"
            >
              {comment?.owner?.username}
            </NavLink>

            <span className="text-zinc-500 text-xs">
              2 days ago
            </span>
          </div>

          {/* Three Dot Icon */}
          <button className="text-zinc-400 hover:text-white transition">
            <MoreVertical size={16} />
          </button>

        </div>

        {/* Comment Text */}
        <p className="text-white text-sm leading-relaxed whitespace-pre-line">
          {comment?.content}
        </p>

        {/* Like Section */}
        <div className="flex items-center gap-3 mt-1">

          <button
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition"
            onClick={(e) => (handelCommentLike(e))}>
              <span className="text-white">
            {commentLike?.liked ? (
              <VscThumbsupFilled size={18} />
            ) : (
              <VscThumbsup size={18} />
            )}
            </span>
            <span className="text-white text-xs">{commentLike?.likeCount || 0}</span>
          </button>

        </div>

      </div>
    </div>
  );
}