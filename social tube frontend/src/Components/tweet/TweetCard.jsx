import { ThumbsUp } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function TweetCard({tweet}) {
    return (
        <div className="w-full px-8 md:px-12 py-4">

            <div className="w-full bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 min-h-30">

                {/* Top Section */}
                <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <NavLink to={`/channel/${tweet?.owner?._id}`}>
                    <img
                        src={tweet?.owner?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=JohnDoe"}  // Use user's thumbnail or a default image
                        alt="avatar" 
                        className="w-11 h-11 rounded-full object-cover"
                    />
                    </NavLink>

                    {/* Content */}
                    <div className="flex flex-col w-full">

                        {/* Username Row */}
                         <NavLink to={`/channel/${tweet?.owner?._id}`}>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-semibold">
                                {tweet?.owner?.fullName || "fullName"}
                            </span>

                            <span className="text-zinc-400 text-sm">
                               {tweet?.owner?.username || "@username"}
                            </span>

                            <span className="text-zinc-500 text-sm">
                                • 2h
                            </span>
                        </div>
                        </NavLink>

                        {/* Tweet Text */}
                        <p className="text-zinc-200 text-[15px] mt-3 leading-relaxed">
                            {tweet?.content || "This is a sample tweet content. It can be multiple lines long and should display properly within the card layout."}
                        </p>

                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-8 mt-5 text-zinc-400 text-sm">

                    <button className="text-white flex items-center gap-2  hover:bg-zinc-700 px-4 py-2 rounded-2xl transition">
                        <ThumbsUp size={18} />
                        <span className="text-sm">12K</span>
                    </button>

                    <button className="hover:text-white transition">
                        Share
                    </button>

                </div>

            </div>

        </div>
    );
}