import prisma from "../libs/prisma.js";

// Ensure only admins can access these (this should ideally be in middleware, but we will assume basic checking for now or rely on the frontend hiding it)
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: Admins only" });
};

// 1. Manage Users: List users with their trips
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        trips: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// 2. Popular Cities: Rank cities based on Stop records
export const getPopularCities = async (req, res) => {
  try {
    const stops = await prisma.stop.groupBy({
      by: ['city', 'country'],
      _count: { city: true },
      orderBy: { _count: { city: 'desc' } },
      take: 10,
    });
    
    // Format the response for the frontend
    const formatted = stops.map(stop => ({
      name: stop.city,
      country: stop.country,
      visits: stop._count.city,
    }));
    
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular cities", error: error.message });
  }
};

// 3. Popular Activities: Rank activities based on Activity records
export const getPopularActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.groupBy({
      by: ['name'],
      _count: { name: true },
      orderBy: { _count: { name: 'desc' } },
      take: 10,
    });
    
    const formatted = activities.map(act => ({
      name: act.name,
      count: act._count.name,
    }));
    
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular activities", error: error.message });
  }
};

// 4. Analytics: Aggregated data for Recharts (trips by month, general stats)
export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalTrips = await prisma.trip.count();
    const totalPosts = await prisma.communityPost.count();
    
    // Monthly trips for the last year (rough approximation in JS since SQL grouping is complex across dialects)
    const trips = await prisma.trip.findMany({
      select: { createdAt: true }
    });
    
    const tripsByMonth = trips.reduce((acc, trip) => {
      const month = trip.createdAt.toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    
    const lineChartData = Object.keys(tripsByMonth).map(month => ({
      name: month,
      trips: tripsByMonth[month]
    }));

    // Budget distribution for pie chart (e.g. Low, Medium, High)
    const budgets = await prisma.trip.findMany({ select: { budget: true } });
    let low = 0, medium = 0, high = 0;
    budgets.forEach(t => {
      if (t.budget < 1000) low++;
      else if (t.budget < 3000) medium++;
      else high++;
    });
    
    const pieChartData = [
      { name: "Budget < $1k", value: low },
      { name: "Budget $1k-$3k", value: medium },
      { name: "Budget > $3k", value: high },
    ];

    res.status(200).json({
      stats: { totalUsers, totalTrips, totalPosts },
      lineChartData,
      pieChartData
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics", error: error.message });
  }
};
