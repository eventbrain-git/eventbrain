import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEntityById = async (entityId: number) => {
  if (isNaN(entityId)) {
    throw new Error("Entity ID invalide");
  }

  const entity = await prisma.entity.findUnique({
    where: { entityId },
    select: {
      entityId: true,
      entityName: true,
      entityDescription: true,
    },
  });

  if (!entity) {
    throw new Error("Entity not found");
  }

  return entity;
};
