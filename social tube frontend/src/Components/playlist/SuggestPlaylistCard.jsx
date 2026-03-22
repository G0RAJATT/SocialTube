import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { addVideoToPlaylist, removeVideoFromPlaylist } from "../../features/playlistFeatures/playlistThunk";

function SuggestPlaylistCard({ playlist , videoId}) {

    const [isSaved, setIsSaved] = useState(false);

    const dispatch = useDispatch();

    const handelSaveVideoToPlaylist = (e) => {
        e.preventDefault();
        setIsSaved(true);

        dispatch(addVideoToPlaylist({playlistId: playlist?._id , videoId})) 


    }

    const handelRemoveVideoFromPlaylist = (e) => {

        e.preventDefault();
        setIsSaved(false); 

        dispatch(removeVideoFromPlaylist({playlistId: playlist?._id , videoId}))
    }

    return (
        <div className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-zinc-900 transition">

            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">

                {/* Thumbnail */}
                <div className="w-16 h-10 bg-zinc-800 rounded-md overflow-hidden shrink-0">
                    <img
                        src={playlist?.playlistPoster?.[0]?.thumbnail || "https://i.pinimg.com/736x/26/d6/f5/26d6f556bee36985a6194f611bdcb94a.jpg"}
                        alt="playlist thumbnail"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Playlist Name */}
                <span className="text-zinc-100 text-sm font-medium line-clamp-1">
                    {playlist.name}
                </span>

            </div>

            {/* Save Button */}


            {isSaved
             
             ?
              (  <button
                    className={`p-2 rounded-md border transition flex items-center justify-center bg-white text-black border-white`}
                    onClick={(e) => (handelRemoveVideoFromPlaylist(e))}
                >
                    <BookmarkCheck size={16} />

            
                    
                </button>)
                :
                (<button className={`p-2 rounded-md border transition flex items-center justify-center bg-transparent text-white border-zinc-600 hover:border-white hover:bg-zinc-800`}
                onClick={(e) => ( handelSaveVideoToPlaylist(e))}
                >
                    <Bookmark size={16} />
                

                </button>)}

        </div>
    );
}

export default SuggestPlaylistCard;