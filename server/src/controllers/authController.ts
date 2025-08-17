import { Request, Response } from "express";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const { login: username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    res.json({ message: "Connecté", user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const me = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });
  res.json({ user: req.user });
};

export const logout = (_req: Request, res: Response) => {
  // côté JWT, rien à invalider : le front supprime le token
  res.json({ message: "Déconnecté côté client" });
};
