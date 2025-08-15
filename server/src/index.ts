import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import artistRoutes from "./routes/artistRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "une_chaine_secrete",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // en prod, mettre true si HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

const verifyCallback: VerifyFunction = async (login, password, done) => {
  try {
    const userAuth = await prisma.userAuth.findUnique({
      where: { login },
      include: {
        user: true,
      },
    });

    if (!userAuth) return done(null, false, { message: "Utilisateur non trouvé" });

    const valid = await bcrypt.compare(password, userAuth.password);
    if (!valid) return done(null, false, { message: "Mot de passe incorrect" });

    if (!userAuth.user) return done(null, false, { message: "Utilisateur non lié" });

    const user = userAuth.user;

    return done(null, {
      userId: user.userId,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
    });
  } catch (error) {
    return done(error);
  }
};

passport.use(new LocalStrategy({ usernameField: "login" }, verifyCallback));

passport.serializeUser((user: any, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) return done(null, false);

    done(null, {
      userId: user.userId,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
    });
  } catch (err) {
    done(err);
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    req.logIn(user, (err: any) => {
      if (err) return next(err);
      return res.json({ message: "Connecté", user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Déconnecté" });
  });
});

app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Non authentifié" });
  }
});

app.use("/artist", artistRoutes);
app.use("/user", userRoutes);

const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

