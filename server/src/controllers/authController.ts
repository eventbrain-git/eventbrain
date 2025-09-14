import { Request, Response } from "express";
import * as authService from "../services/authService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { login: username, password } = req.body;

    const user = await authService.login(username, password);

    // Stockage dans la session
    (req.session as any).user = {
      userId: user.userId,
      userEmail: user.userAuthId ? (await prisma.userAuth.findUnique({ where: { userAuthId: user.userAuthId } }))?.login ?? "" : "",
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
    };

    res.json({ message: "Connecté", user: (req.session as any).user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const me = async (req: Request, res: Response) => {
  const sessionUser = (req.session as any).user;
  if (!sessionUser) return res.status(401).json({ message: "Non authentifié" });

  const user = await prisma.user.findUnique({
    where: { userId: sessionUser.userId },
    select: {
      userId: true,
      userFirstName: true,
      userLastName: true,
      userAuth: { select: { login: true } },
    },
  });

  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

  res.json({ user });
};

export const logout = (req: Request, res: Response) => {
  (req.session as any)?.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Déconnecté" });
  });
};
