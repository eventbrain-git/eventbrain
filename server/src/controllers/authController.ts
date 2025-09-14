import { Request, Response } from "express";
import * as authService from "../services/authService";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { login: username, password } = req.body;

    console.log("[Login] Attempt for user:", username);

    const user = await authService.login(username, password);

    if (!user) {
      console.warn("[Login] Authentication failed for user:", username);
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("[Login] JWT_SECRET non défini");
      return res.status(500).json({ message: "Problème serveur, JWT_SECRET manquant" });
    }

    // Récupérer l'email depuis la table userAuth via userAuthId
    let userEmail = "";
    if (user.userAuthId) {
      const authRecord = await prisma.userAuth.findUnique({
        where: { userAuthId: user.userAuthId },
      });
      userEmail = authRecord?.login ?? "";
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        userEmail,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("[Login] Token generated for userId:", user.userId);

    res.json({ message: "Connecté", token, user });
  } catch (err: any) {
    console.error("[Login] Error:", err);
    res.status(401).json({ message: err.message ?? "Erreur inconnue" });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      console.warn("[Me] Non authentifié");
      return res.status(401).json({ message: "Non authentifié" });
    }

    console.log("[Me] User fetched:", user.userId);
    res.json({ user });
  } catch (err: any) {
    console.error("[Me] Error:", err);
    res.status(500).json({ message: err.message ?? "Erreur inconnue" });
  }
};

export const logout = (req: Request, res: Response) => {
  console.log("[Logout] User logout requested");
  res.json({ message: "Déconnecté, supprimez le token côté client" });
};
