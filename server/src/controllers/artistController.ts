import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getArtists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: {
        artistName: "asc",
      },
    });
    res.json({ artists });
  } catch (error) {
    console.error("Error retrieving artists:", error);
    res.status(500).json({ message: "Error retrieving artists" });
  }
};
