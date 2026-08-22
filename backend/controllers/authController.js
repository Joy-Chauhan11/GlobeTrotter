import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";

const JWT_EXPIRES = "7d";

const getJwtSecret = () => process.env.JWT_SECRET || "globetrotter_dev_secret_change_in_prod";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({ message: "Email, password, and first name are required." });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName: lastName || "",
      },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, getJwtSecret(), { expiresIn: JWT_EXPIRES });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Registration failed.", error: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, getJwtSecret(), { expiresIn: JWT_EXPIRES });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

// GET /api/auth/me  (requires JWT)
export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profilePictureUrl: true,
        city: true,
        country: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ message: "Failed to fetch user.", error: err.message });
  }
};

// POST /api/auth/logout  (client just drops the token, but we can confirm)
export const logout = async (req, res) => {
  return res.status(200).json({ message: "Logged out successfully." });
};
