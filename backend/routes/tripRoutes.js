import express from "express";
import {
  getTrips,
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip,
  getStops,
  addStop,
  updateStop,
  deleteStop,
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getBudget,
} from "../controllers/tripController.js";

const router = express.Router();

// Trips
router.get("/", getTrips);
router.post("/", createTrip);

router.get("/:tripId", getTrip);
router.put("/:tripId", updateTrip);
router.delete("/:tripId", deleteTrip);

// Stops / Cities
router.get("/:tripId/stops", getStops);
router.post("/:tripId/stops", addStop);

router.put("/:tripId/stops/:stopId", updateStop);
router.delete("/:tripId/stops/:stopId", deleteStop);

// Activities
router.get("/:tripId/stops/:stopId/activities", getActivities);

router.post("/:tripId/stops/:stopId/activities", addActivity);

router.put(
  "/:tripId/stops/:stopId/activities/:activityId",
  updateActivity
);

router.delete(
  "/:tripId/stops/:stopId/activities/:activityId",
  deleteActivity
);

// Expenses
router.get("/:tripId/expenses", getExpenses);
router.post("/:tripId/expenses", addExpense);

router.put("/:tripId/expenses/:expenseId", updateExpense);

router.delete("/:tripId/expenses/:expenseId", deleteExpense);

// Budget
router.get("/:tripId/budget", getBudget);

export default router;