import { Router } from "express";
import { getUserData } from "../controllers/userController";

const router = Router();

router.get("/:id", getUserData);

export default router;
