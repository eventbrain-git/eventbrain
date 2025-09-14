import { Router } from "express";
import * as authController from "../controllers/authController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/login", authController.login);

router.get("/me", requireAuth, (req, res) => {
  const session = req.session as any;
  res.json({ user: session.user });
});

router.post("/logout", authController.logout);

export default router;
