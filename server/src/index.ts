import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import artistRoutes from "./routes/artistRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();

// --- Parser JSON ---
app.use(express.json());

// --- CORS uniquement en dev/local ---
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000", // ton Next.js local
      credentials: true,
    })
  );
  console.log("✅ CORS activé pour http://localhost:3000 (dev)");
} else {
  console.log("🚀 CORS géré par API Gateway (prod)");
}

// --- Routes ---
app.use("/artist", artistRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
