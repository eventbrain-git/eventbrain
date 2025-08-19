import { Request, Response } from "express";
import * as authService from "../services/authService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { login: username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    res.json({ message: "Connecté", user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });

  const { userId } = req.user as { userId: number };

  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      userFirstName: true,
      userLastName: true,
      userAuth: {
        select: {
          login: true,
        }
      }
    },
  });  

  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

  res.json({ user });
};


export const logout = (_req: Request, res: Response) => {
  res.json({ message: "Déconnecté côté client" });
};
