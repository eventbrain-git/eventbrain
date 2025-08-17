import { Router } from "express";
import * as authController from "../controllers/authController";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = Router();

router.post("/login", authController.login);
router.get("/me", authenticateJWT, authController.me);
router.post("/logout", authController.logout);

export default router;
