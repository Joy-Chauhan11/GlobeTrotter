export const getStats = async (req, res) => {
  try {
    const uptime = process.uptime();
    const env = process.env.NODE_ENV || "development";

    // Placeholder stats. Replace with Prisma counts when schema exists.
    return res.status(200).json({
      uptime,
      env,
      message: "Placeholder stats — connect Prisma models for real counts",
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};
