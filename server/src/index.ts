import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import artistRoutes from "./routes/artistRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 3001;

// --- Parser JSON ---
app.use(express.json());

// --- CORS ---
const FRONTEND_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://preprod.dvx379pmsslb4.amplifyapp.com";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true, // ✅ nécessaire pour envoyer/recevoir les cookies
  })
);

// --- Session ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "monsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

// --- Routes ---
app.use("/artist", artistRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
