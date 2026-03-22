import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getOwner,
    getVideoById,
    increaseViewCount,
    publishAVideo,
    toggelPublishStatus,
    updateVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import optionalAuth from "../middlewares/optionalAuth.middleware.js";


const router = Router();

router.route('/')
    .get(getAllVideos)

router.route('/:videoId')
    .get(optionalAuth, getVideoById)

router.route('/increase-view/:videoId').patch(increaseViewCount)

router.use(verifyJWT);

router.route('/')
    .post(
        upload.fields(
            [
                {
                    name: "video",
                    maxCount: 1,
                },
                {
                    name: "thumbnail",
                    maxCount: 1
                }
            ]
        ), publishAVideo);

router.route('/:videoId')
    .patch(upload.single("thumbnail"), updateVideo)
    .delete(deleteVideo);

router.route('/getowner/:videoId').get(getOwner)

router.route('/toggel/publish/:videoId').patch(toggelPublishStatus);


// router.route('/getowner').post(getOwner)
export default router;