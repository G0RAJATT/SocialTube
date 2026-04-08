import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Mic,
  Plus,
  MessagesSquare,
  Bell,
  Video,
  PenLine
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({toggleMenu}) {
  const [openCreate, setOpenCreate] = useState(false);
  const [avatar, setAvatar] = useState("https://i.pinimg.com/736x/b0/8e/19/b08e19da8ac6cec9cc3630d4b79893a0.jpg");

  const isAuthenticated = useSelector( (state) => state.user.isAuthenticated);
  const user = useSelector( (state) => state.user.user);

  const navigate = useNavigate();


  useEffect(() => {

    if(user){
      setAvatar(user.avatar);
      
    }
  }, [user]);

  const handelUploadVideo = () => {

    setOpenCreate(false);
    navigate("/upload-video");

  }

  const handelPostTweet = () => {

    setOpenCreate(false);
    navigate("/create-post");
  }

 return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/60 border-b border-white/10">
      <div className="h-16 px-4 flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button 
          className="p-2 rounded-full hover:bg-white/10"
          onClick={toggleMenu}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <NavLink to = "/">
          <div className="text-white font-semibold text-lg">
            SocialTube
          </div>
          </NavLink>
        </div>

        {/* CENTER (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3 w-full max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#111111] border border-[#1f1f1f] rounded-full px-5 py-2.5 pr-12 text-zinc-200 outline-none focus:border-zinc-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          </div>

          <button className="p-2 rounded-full bg-[#111111] border border-[#1f1f1f] hover:bg-white/10">
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Create */}
          <div className="relative">
            <button
              onClick={() => setOpenCreate(!openCreate)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-white text-white hover:bg-white/10"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:block">Create</span>
            </button>

            {openCreate && (
              <div className="absolute test-white right-0 mt-2 w-48 bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
              
              
                <button
                 className="w-full text-left px-4 py-3 text-zinc-200 hover:bg-white/10 flex items-center gap-3 bg-transparent border-none outline-none"
                 onClick={ handelUploadVideo}
                 >
                  <Video className=" text-zinc-200 w-5 h-5" />
                  Upload video
                </button>
               

              
                <button 
                 className="w-full text-left px-4 py-3 text-zinc-200 hover:bg-white/10 flex items-center gap-3 bg-transparent border-none outline-none"
                 onClick={handelPostTweet}
                 >
                  <MessagesSquare className=" text-zinc-200 w-5 h-5" />
                  Post tweet
                </button>

              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-white/10">
            <Bell className="w-5 h-5 text-white" />
          </button>

          {/* Avatar / Sign in */}
         
          <div className="flex items-center gap-4">
          
           {isAuthenticated ? (<div className="w-9 h-9 rounded-full overflow-hidden border border-[#1f1f1f]">
            <img
              src={avatar}
              className="w-full h-full object-cover"
            />
          </div>) : (<NavLink to = "/sign-in"><button
            className="  px-5 py-1.5  text-sm font-medium  text-white  rounded-full  border border-zinc-700  bg-zinc-900/60  backdrop-blur-md
                  hover:bg-zinc-800  hover:border-zinc-500  active:scale-95  transition-all duration-200  shadow-md "
          >
            Sign In
          </button>
          </NavLink>)}

          </div>

        </div>
      </div>
    </nav>
  );
}
