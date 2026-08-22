import express from "express";
import {
	getCities,
	getCity,
	getActivities,
	getActivity,
} from "../controllers/exploreController.js";

const router = express.Router();

// Cities
router.get("/cities", getCities);
router.get("/cities/:cityId", getCity);

// Activities
router.get("/activities", getActivities);
router.get("/activities/:activityId", getActivity);

export default router;