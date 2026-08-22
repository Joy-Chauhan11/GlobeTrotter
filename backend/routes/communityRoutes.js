import express from "express";
import {
	getCommunity,
	getPost,
	createPost,
	deletePost,
	shareTrip,
	unshareTrip,
	getSharedTrip,
	toggleLike,
	addComment,
} from "../controllers/communityController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Community
router.get("/", getCommunity);
router.get("/:postId", getPost);
router.post("/", requireAuth, createPost);
router.delete("/:postId", requireAuth, deletePost);
router.post("/:postId/like", requireAuth, toggleLike);
router.post("/:postId/comments", requireAuth, addComment);

// Shared Trips
router.post("/trips/:tripId/share", requireAuth, shareTrip);
router.delete("/trips/:tripId/share", requireAuth, unshareTrip);

// Public Trip
router.get("/shared/:tripId", getSharedTrip);

export default router;