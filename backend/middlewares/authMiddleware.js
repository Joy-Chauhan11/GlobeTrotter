import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "globetrotter_dev_secret_change_in_prod";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    
    // Fetch user to get full details (like role)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found." });
    }

    req.user = user;
    req.userId = user.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
  }
};

export const requireAuth = authMiddleware;
