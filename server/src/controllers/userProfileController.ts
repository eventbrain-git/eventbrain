import { Request, Response } from "express";
import { getUserProfileById } from "../services/userProfileService";

export const getUserProfileData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userProfileId = Number(req.params.id);
    const userProfile = await getUserProfileById(userProfileId);
    res.json({ userProfile });
  } catch (error: any) {
    console.error(error.message);
    if (error.message === "User Profile ID invalide") {
      res.status(400).json({ message: error.message });
    } else if (error.message === "User profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving user data" });
    }
  }
};
