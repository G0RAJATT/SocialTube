import { NavLink } from "react-router-dom";
import {
  Home,
  MessagesSquare,
  History,
  ListVideo,
  ThumbsUp,
  Video,
} from "lucide-react";
import { useSelector } from "react-redux";

const navBase =
  "w-full flex items-center gap-4 px-4 py-2 rounded-lg text-zinc-300 " +
  "hover:bg-zinc-800 transition-colors duration-200";

const navActive =
  "bg-[#1f1f1f] text-white hover:bg-[#262626]";

export default function LeftPanel({ openMenu }) {

  const user = useSelector((state) => state.user.user)
  const channelId = user?._id;

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-black border-r border-[#1f1f1f] overflow-y-auto 
        z-60 transform transition-transform duration-300 shadow-xl

    ${openMenu ? "translate-x-0" : "-translate-x-full hidden"}

     md:static md:translate-x-0 md:z-auto
  `}
    >
      {/* IMPORTANT: flex + gap instead of space-y */}
      <div className="p-2 flex flex-col gap-2">

        {/* -------- Section 1 -------- */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <Home className="w-5 h-5 text-white" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/tweets/all-tweets"
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <MessagesSquare className="w-5 h-5 text-white" />
          <span>Tweets</span>
        </NavLink>

        <div className="border-t border-zinc-700 my-2" />

        {/* -------- Section 2 -------- */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <History className="w-5 h-5 text-white" />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <ListVideo className="w-5 h-5 text-white" />
          <span>Playlists</span>
        </NavLink>

        <NavLink
          to="/liked"
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <ThumbsUp className="w-5 h-5 text-white" />
          <span>Liked videos</span>
        </NavLink>

        <NavLink
          to={`/channel/${channelId}`}
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <Video className="w-5 h-5 text-white" />
          <span>Your videos</span>
        </NavLink>

        <div className="border-t border-zinc-700 my-2" />

        {/* -------- Section 3 -------- */}
        <div className="px-4 py-1 text-sm text-zinc-400">
          Subscriptions
        </div>

        {/* Subscription template (for map later) */}
        <NavLink
          to="/channel/sample-channel"
          className={({ isActive }) =>
            `${navBase} ${isActive ? navActive : ""}`
          }
        >
          <div className="w-7 h-7 rounded-full bg-zinc-700 overflow-hidden">
            <img
              src="https://via.placeholder.com/40"
              alt="channel"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="truncate">Sample Channel</span>
        </NavLink>

      </div>
    </aside>
  );
}
