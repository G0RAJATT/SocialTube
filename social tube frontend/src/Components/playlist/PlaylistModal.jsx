import { useEffect, useState } from "react";
import SuggestPlaylistCard from "./SuggestPlaylistCard";
import { useDispatch, useSelector } from "react-redux";
import { CreatePlaylist } from "../../features/playlistFeatures/playlistThunk";

function PlaylistModal({ playlists = [], onClose }) {

  const [newPlaylist, setNewPlaylist] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const AllPlaylists = useSelector((state) => state.playlist.AllPlaylists);
  const openVideoMenuId = useSelector((state) => state.video.openMenuVideoId);

  // useEffect(() => {

  //   if (AllPlaylists) {
  //     console.log(AllPlaylists);

  //   }
  // }, [AllPlaylists])

  const handelCreatePlaylist = (e) => {
    e.preventDefault();

    const playlistData = {
      name: newPlaylist,
      description: description || "Like Share Comment and Subscribe to my channel",
    }

    dispatch(CreatePlaylist(playlistData))


  }


  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-1000">

      <div className="w-96 bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-white text-lg font-semibold">
            Save to Playlist
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        {/* Create Playlist */}
        <div className="flex flex-col gap-3 mb-4">

          <input
            type="text"
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
            placeholder="Create new playlist"
            className="flex-1 bg-zinc-900 text-white px-3 py-2 rounded-md border border-zinc-800 outline-none"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="2"
            className="w-full bg-zinc-900 text-white px-3 py-2 rounded-md border border-zinc-800 outline-none resize-none focus:border-zinc-600"
          />

          {/* Create Button */}
          <button
            className="self-end bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-zinc-200 transition"
            onClick={(e) => (handelCreatePlaylist(e))}
          >
            Create +
          </button>

        </div>

        {/* Existing Playlists */}
        <div className="max-h-52 overflow-y-auto">



          {AllPlaylists.map((playlist) => (<SuggestPlaylistCard key={playlist._id} playlist={playlist} videoId={openVideoMenuId} />))}
        </div>


      </div>

    </div>

  );
}

export default PlaylistModal;