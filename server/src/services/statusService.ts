import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStatusById = async (statusId: number) => {
  if (isNaN(statusId)) {
    throw new Error("Status ID invalide");
  }

  const status = await prisma.status.findUnique({
    where: { statusId },
    select: {
      statusId: true,
      statusName: true,
      statusDescription: true,
    },
  });

  if (!status) {
    throw new Error("Status not found");
  }

  return status;
};
