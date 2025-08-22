import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTypeById = async (typeId: number) => {
  console.log("🔎 Appel getTypeById avec:", typeId);

  if (isNaN(typeId)) {
    console.warn("⚠️ Type ID invalide:", typeId);
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

  console.log("📥 Résultat Prisma:", type);

  if (!type) {
    console.warn("⚠️ Aucun type trouvé pour ID:", typeId);
    throw new Error("Type not found");
  }

  return type;
};
