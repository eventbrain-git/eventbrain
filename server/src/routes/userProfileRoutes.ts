import { Router } from "express";
import { getUserProfileData } from "../controllers/userProfileController";

const router = Router();

router.get("/:id", getUserProfileData);

export default router;
