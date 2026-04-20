import { Router } from "express";
import verifyJWT from '../middlewares/auth.middleware.js'
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    isUserSubscribedToChannel,
    toggleSubscription
} from "../controllers/subscription.controller.js";

const router = Router();
router.use(verifyJWT);

router.route('/isSubscribed/:channelId/:userId').get(isUserSubscribedToChannel)

router.route('/subscribe/:channelId')
    .post(toggleSubscription)
    .get(getUserChannelSubscribers)

router.route('/channel/:subscriberId').get(getSubscribedChannels)

export default router;