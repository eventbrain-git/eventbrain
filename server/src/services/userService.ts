import { getAccountById } from "./accountService";
import { getStatusById } from "./statusService";
import { getUserProfileById } from "./userProfileService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (userId: number) => {
  if (isNaN(userId)) {
    throw new Error("User ID invalide");
  }

  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      userFirstName: true,
      userLastName: true,
      userProfileId: true,
      statusId: true,
      accountId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let profile = null;
  if (user.userProfileId !== null) {
    profile = await getUserProfileById(user.userProfileId);
  }

  let status = null;
  if (user.statusId !== null) {
    status = await getStatusById(user.statusId);
  }

  let account = null;
  if (user.accountId !== null) {
    account = await getAccountById(user.accountId);
  }

  return { ...user, profile, status, account };
};
