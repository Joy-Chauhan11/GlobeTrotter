import express from "express";
import { suggestStops, suggestActivities } from "../controllers/aiController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/suggest-stops", suggestStops);
router.get("/suggest-activities", suggestActivities);

export default router;
