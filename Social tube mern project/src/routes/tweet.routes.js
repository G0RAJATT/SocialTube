import { Router } from "express";
import { createTweet, deleteTweet, getUserTweets, updateTweet , getAllTweets } from "../controllers/tweet.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/all-tweets').get(getAllTweets)

router.use(verifyJWT)

router.route('/tweet')
    .post(createTweet)
    .get(getUserTweets) 

router.route('/tweet/:tweetId')
.post(updateTweet)
.delete(deleteTweet)


export default router;