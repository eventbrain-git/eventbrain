import { Router } from "express";
import { getDashvoardMetrics } from "../controllers/dashboardController";

const router = Router();

router.get("/", getDashvoardMetrics);

export default router;