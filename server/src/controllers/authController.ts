import { Request, Response } from "express";
import * as authService from "../services/authService";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { login: username, password } = req.body;
    const user = await authService.login(username, password);

    // Génération du JWT
    const token = jwt.sign(
      {
        userId: user.userId,
        userEmail: user.userAuthId
          ? (await prisma.userAuth.findUnique({ where: { userAuthId: user.userAuthId } }))?.login ?? ""
          : "",
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ message: "Connecté", token, user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ message: "Non authentifié" });

  res.json({ user });
};

export const logout = (req: Request, res: Response) => {
  // Pas de session à détruire, JWT côté client
  res.json({ message: "Déconnecté, supprimez le token côté client" });
};
