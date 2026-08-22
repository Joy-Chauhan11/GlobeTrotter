import express from "express";
import {
	getCommunity,
	getPost,
	createPost,
	deletePost,
	shareTrip,
	unshareTrip,
	getSharedTrip,
} from "../controllers/communityController.js";

const router = express.Router();

// Community
router.get("/", getCommunity);
router.get("/:postId", getPost);
router.post("/", createPost);
router.delete("/:postId", deletePost);

// Shared Trips
router.post("/trips/:tripId/share", shareTrip);
router.delete("/trips/:tripId/share", unshareTrip);

// Public Trip
router.get("/shared/:tripId", getSharedTrip);

export default router;