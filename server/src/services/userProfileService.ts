import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserProfileById = async (userProfileId: number) => {
  if (isNaN(userProfileId)) {
    throw new Error("User Profile ID invalide");
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { userProfileId },
    select: {
      userProfileId: true,
      userProfileName: true,
      userProfileDescription: true,
    },
  });

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return userProfile;
};
