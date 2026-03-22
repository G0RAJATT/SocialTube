import { useState, useEffect } from "react";
import { MessagesSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CreateTweet } from "../../features/tweetFeatures/tweetThunks";
import { NavLink, useNavigate } from "react-router-dom";

export default function PostTweet() {
    const [content, setContent] = useState("");
    const tweetObj = useSelector((state) => state.tweet.tweetObj)
    const error = useSelector((state) => state.tweet.error)
    const lastAction = useSelector((state) => state.tweet.lastAction)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const autoResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    useEffect(() => {
        if (error) console.log("Error\n", error);
    }, [error])

    useEffect(() => {

        if(tweetObj){
          setContent("");
        }
      

    }, [tweetObj] )

    const handelTweetSubmit = async (e) => {

        e.preventDefault();
        const formData = {
            content: content
        }
      const result = await dispatch(CreateTweet(formData));

      if(result.meta.requestStatus === "fulfilled"){
          navigate("/tweets/all-tweets");
      }
      

    }

    return (
        <div className="min-h-screen bg-black flex justify-center px-4 py-10">
            {/* Main container */}
            <div className="w-full max-w-2xl">

                {/* Tweet Box */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">

                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                        {/* Left: Avatar + Username */}
                        <div className="flex items-center gap-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <span className="text-white font-medium">
                                @yourusername
                            </span>
                        </div>

                    </div>

                    {/* Tweet Input */}
                    <div className="relative">
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                autoResize(e);
                            }}
                            placeholder="Lets Tweet"
                            rows={4}
                            className=" w-full resize-none bg-transparent text-white text-lg font-semibold placeholder:text-zinc-600 outline-none overflow-y-auto no-scrollbar"
                        />


                        {/* Tweet icon bottom-right */}
                        <MessagesSquare
                            size={22}
                            className="absolute bottom-2 right-2 text-zinc-500"
                        />
                    </div>
                </div>

                {/* Post Button */}
                <NavLink to="/tweets/all-tweets">
                <div className="flex justify-end mt-4">
                    <button
                        className="
              px-6 py-2 rounded-xl
              bg-white text-black font-medium
              hover:bg-zinc-200
              active:scale-95
              transition-all duration-200
            "
                        onClick={ (e) => handelTweetSubmit(e)}
                    >
                        Post Tweet
                    </button>
                </div>
              </NavLink>
            </div>
        </div>
    );
}
