import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    getLikedComments,
    getLikedVideos,
    getTotalCommentLikes,
    getTotalTweetLikes,
    getTotalVideoLikes,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike
} from "../controllers/like.controller.js";


const router = Router();

router.use(verifyJWT);

router.route('/video/:videoId').post(toggleVideoLike);
router.route('/comment/:commentId').post(toggleCommentLike);
router.route('/tweet/:tweetId').post(toggleTweetLike);
router.route('/').post(getLikedVideos);

router.route('/video-likes/:videoId').get(getTotalVideoLikes);
router.route('/comment-likes/:commentId').get(getTotalCommentLikes);
router.route('/tweet-likes/:tweetId').get(getTotalTweetLikes);

router.route('/liked-comments/:videoId').get(getLikedComments);


export default router;