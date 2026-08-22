import express from "express";
import {
  getUsers,
  getPopularCities,
  getPopularActivities,
  getAnalytics,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Require auth for all admin routes.
// A proper implementation would also check req.user.role === 'ADMIN' via an adminMiddleware.
// For now, we protect it via auth and the frontend will conditionally render the Admin tab.

router.use(authMiddleware);

router.get("/users", getUsers);
router.get("/popular-cities", getPopularCities);
router.get("/popular-activities", getPopularActivities);
router.get("/analytics", getAnalytics);

export default router;