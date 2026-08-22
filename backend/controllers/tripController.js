import prisma from "../libs/prisma.js";


// GET all trips
export const getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trips",
      error: error.message,
    });
  }
};


// CREATE trip
export const createTrip = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      budget,
    } = req.body;

    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget,
      },
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create trip",
      error: error.message,
    });
  }
};


// GET single trip
export const getTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await prisma.trip.findUnique({
      where: {
        id: Number(tripId),
      },
      include: {
        stops: {
          include: {
            activities: true,
          },
        },
        expenses: true,
      },
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trip",
      error: error.message,
    });
  }
};


// UPDATE trip
export const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const {
      title,
      description,
      startDate,
      endDate,
      budget,
    } = req.body;

    const trip = await prisma.trip.update({
      where: {
        id: Number(tripId),
      },
      data: {
        title,
        description,
        startDate: startDate
          ? new Date(startDate)
          : undefined,
        endDate: endDate
          ? new Date(endDate)
          : undefined,
        budget,
      },
    });

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update trip",
      error: error.message,
    });
  }
};


// DELETE trip
export const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    await prisma.trip.delete({
      where: {
        id: Number(tripId),
      },
    });

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete trip",
      error: error.message,
    });
  }
};



// GET stops
export const getStops = async (req, res) => {
  try {
    const { tripId } = req.params;

    const stops = await prisma.stop.findMany({
      where: {
        tripId: Number(tripId),
      },
      orderBy: {
        startDate: "asc",
      },
      include: {
        activities: true,
      },
    });

    res.status(200).json(stops);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stops",
      error: error.message,
    });
  }
};


// ADD stop
export const addStop = async (req, res) => {
  try {
    const { tripId } = req.params;

    const {
      city,
      country,
      startDate,
      endDate,
    } = req.body;

    const stop = await prisma.stop.create({
      data: {
        tripId: Number(tripId),
        city,
        country,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add stop",
      error: error.message,
    });
  }
};


// UPDATE stop
export const updateStop = async (req, res) => {
  try {
    const { tripId, stopId } = req.params;

    const {
      city,
      country,
      startDate,
      endDate,
    } = req.body;

    const stop = await prisma.stop.update({
      where: {
        id: Number(stopId),
      },
      data: {
        city,
        country,
        startDate: startDate
          ? new Date(startDate)
          : undefined,
        endDate: endDate
          ? new Date(endDate)
          : undefined,
      },
    });

    res.status(200).json(stop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update stop",
      error: error.message,
    });
  }
};


// DELETE stop
export const deleteStop = async (req, res) => {
  try {
    const { tripId, stopId } = req.params;

    await prisma.stop.delete({
      where: {
        id: Number(stopId),
      },
    });

    res.status(200).json({
      message: "Stop deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete stop",
      error: error.message,
    });
  }
};

// GET activities
export const getActivities = async (req, res) => {
  try {
    const { stopId } = req.params;

    const activities = await prisma.activity.findMany({
      where: {
        stopId: Number(stopId),
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};


// ADD activity
export const addActivity = async (req, res) => {
  try {
    const { stopId } = req.params;

    const {
      name,
      description,
      cost,
      duration,
    } = req.body;

    const activity = await prisma.activity.create({
      data: {
        stopId: Number(stopId),
        name,
        description,
        cost,
        duration,
      },
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add activity",
      error: error.message,
    });
  }
};


// UPDATE activity
export const updateActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const {
      name,
      description,
      cost,
      duration,
    } = req.body;

    const activity = await prisma.activity.update({
      where: {
        id: Number(activityId),
      },
      data: {
        name,
        description,
        cost,
        duration,
      },
    });

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update activity",
      error: error.message,
    });
  }
};


// DELETE activity
export const deleteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    await prisma.activity.delete({
      where: {
        id: Number(activityId),
      },
    });

    res.status(200).json({
      message: "Activity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete activity",
      error: error.message,
    });
  }
};




// GET expenses
export const getExpenses = async (req, res) => {
  try {
    const { tripId } = req.params;

    const expenses = await prisma.expense.findMany({
      where: {
        tripId: Number(tripId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};


// ADD expense
export const addExpense = async (req, res) => {
  try {
    const { tripId } = req.params;

    const {
      category,
      amount,
      description,
    } = req.body;

    const expense = await prisma.expense.create({
      data: {
        tripId: Number(tripId),
        category,
        amount,
        description,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add expense",
      error: error.message,
    });
  }
};


// UPDATE expense
export const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const {
      category,
      amount,
      description,
    } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: Number(expenseId),
      },
      data: {
        category,
        amount,
        description,
      },
    });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
};


// DELETE expense
export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    await prisma.expense.delete({
      where: {
        id: Number(expenseId),
      },
    });

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};




export const getBudget = async (req, res) => {
  try {
    const { tripId } = req.params;

    const expenses = await prisma.expense.findMany({
      where: {
        tripId: Number(tripId),
      },
    });

    const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const breakdown = {};

    for (const expense of expenses) {
      if (!breakdown[expense.category]) {
        breakdown[expense.category] = 0;
      }

      breakdown[expense.category] += Number(
        expense.amount
      );
    }

    res.status(200).json({
      total,
      breakdown,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate budget",
      error: error.message,
    });
  }
};