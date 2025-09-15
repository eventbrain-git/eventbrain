import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (login: string, password: string) => {
  const userAuth = await prisma.userAuth.findUnique({
    where: { login },
    include: { user: true },
  });

  if (!userAuth || !userAuth.user) throw new Error("Utilisateur non trouvé");

  const valid = await bcrypt.compare(password, userAuth.password);
  if (!valid) throw new Error("Mot de passe incorrect");

  return userAuth.user;
};