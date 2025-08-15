import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTypeById = async (typeId: number) => {
  if (isNaN(typeId)) {
    throw new Error("Type ID invalide");
  }

  const type = await prisma.type.findUnique({
    where: { typeId },
    select: {
      typeId: true,
      typeName: true,
      typeDescription: true,
    },
  });

  if (!type) {
    throw new Error("Type not found");
  }

  return type;
};
