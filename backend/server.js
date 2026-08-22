import express from "express";
import cors from "cors";
import path from "path";
import { ENV } from "./libs/env.js";
import console from "console";

import communityRoutes from "./routes/communityRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(express.json());
// Allow frontend dev server to talk to this API
app.use(
    cors({
        origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
        credentials: true,
    }),
);

app.get("/", (req, res) => {
    res.send("Heyyyy Plan Your trip here!!!!");
});

// API routes
app.use("/api/community", communityRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(ENV.PORT, () => {
    console.log("GlobeTrotter is listening!!!!!");
});