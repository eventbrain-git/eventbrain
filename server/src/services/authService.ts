import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("❌ JWT_SECRET manquant en production !");
  } else {
    console.warn("⚠️ JWT_SECRET non trouvé, utilisation d'une clé par défaut (dev uniquement)");
  }
}

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
    {
      userId: user.userId,
      userEmail: userAuth.login,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  console.log("🔑 Token généré :", token.substring(0, 20) + "...");

  return { token, user };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
