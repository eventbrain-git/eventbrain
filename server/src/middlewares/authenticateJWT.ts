import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "une_chaine_secrete";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("🔑 Authorization header reçu:", authHeader);

  if (!authHeader) {
    console.warn("⚠️ Aucun header Authorization");
    return res.status(401).json({ message: "Non authentifié" });
  }

  const token = authHeader.split(" ")[1];
  console.log("📦 Token extrait:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token décodé:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Erreur de vérification JWT:", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};
