import { useState, useRef, useEffect } from "react"
import { MoreVertical, Share2, Trash2 } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deletePlaylist } from "../../features/playlistFeatures/playlistThunk"

function PlaylistCard({ playlist }) {

    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    const dispatch = useDispatch();

    const toggleMenu = (e) => {
        e.preventDefault()
        setShowMenu(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    const handelOnDelete = async(e) => {

        e.preventDefault();

        dispatch(deletePlaylist(playlist?._id));


    }




    return (
 
        <div className="w-full max-w-sm relative">
            <NavLink to={`/video/${playlist?.videos?.[0]}/${playlist?._id}`}>
                {/* Thumbnail */}
                <div className="relative w-full h-56">

                    {/* Back Thumbnail 2 */}
                    <div className="absolute top-3 left-3 w-full h-full rounded-xl overflow-hidden bg-zinc-800">
                        <img
                            src={playlist?.playlistPoster?.[2]?.thumbnail || "https://i.pinimg.com/736x/e1/18/c4/e118c41e6b53123dd385b37550cefc7f.jpg"}
                            alt=""
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>

                    {/* Back Thumbnail 1 */}
                    <div className="absolute top-1.5 left-1.5 w-full h-full rounded-xl overflow-hidden bg-zinc-800">
                        <img
                            alt=""
                            src={playlist?.playlistPoster?.[1]?.thumbnail || "https://i.pinimg.com/736x/13/6e/10/136e1083a437c99a5b4f6a3e63b531da.jpg"}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>

                    {/* Main Thumbnail */}
                    <div className="relative rounded-xl overflow-hidden bg-zinc-900">
                        <img
                            src={playlist?.playlistPoster?.[0]?.thumbnail || "https://i.pinimg.com/736x/13/6e/10/136e1083a437c99a5b4f6a3e63b531da.jpg"}
                            alt="playlist cover"
                            className="w-full h-56 object-cover"
                        />
                    </div>

                </div>

            </NavLink>



            {/* Playlist Info */}
            <div className="mt-7 ml-4 flex flex-col relative">
                <NavLink to={`/playlists/${playlist?._id}`}>

                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                        {playlist?.name || "Playlist Name"}
                    </h3>

                    <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
                        {playlist?.description || "Playlist Description"}
                    </p>

                </NavLink>

                {/* Menu Button */}
                <div ref={menuRef} className="absolute -top-2 right-0">

                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                    >
                        <MoreVertical size={18} className="text-white" />
                    </button>

                    {/* Dropdown */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-36 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50">

                            <button
                                // onClick={() => onShare(playlist._id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-zinc-800"
                            >
                                <Share2 size={16} />
                                Share
                            </button>

                            <button
                                onClick={(e) => handelOnDelete(e)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-zinc-800"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </div >

    )
}

export default PlaylistCard 

