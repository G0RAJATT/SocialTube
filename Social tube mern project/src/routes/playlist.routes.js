import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist
} from "../controllers/playlist.controller.js";


const router = Router()

router.use(verifyJWT)


    router.route('/create-playlist')
    .post(createPlaylist)

    router.route('/get-user-playlists/:username')
    .get(getUserPlaylists)

    router.route('/get-playlist/:playlistId')
    .get(getPlaylistById)
    .delete(deletePlaylist)
    .patch(updatePlaylist)

    router.route('/add-video/:playlistId/:videoId')
    .get(addVideoToPlaylist)
    .delete(removeVideoFromPlaylist)



export default router