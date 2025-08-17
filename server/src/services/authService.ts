import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "une_chaine_secrete";

export const login = async (login: string, password: string) => {
  const userAuth = await prisma.userAuth.findUnique({
    where: { login },
    include: { user: true },
  });

  if (!userAuth || !userAuth.user) throw new Error("Utilisateur non trouvé");

  const valid = await bcrypt.compare(password, userAuth.password);
  if (!valid) throw new Error("Mot de passe incorrect");

  const user = userAuth.user;

  const token = jwt.sign(
    { userId: user.userId, userFirstName: user.userFirstName, userLastName: user.userLastName },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
