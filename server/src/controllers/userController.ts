import { Request, Response } from "express";
import { getUserById } from "../services/userService";

export const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const user = await getUserById(userId);
    res.json({ user });
  } catch (error: any) {
    console.error(error.message);
    if (error.message === "User ID invalide") {
      res.status(400).json({ message: error.message });
    } else if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving user data" });
    }
  }
};
