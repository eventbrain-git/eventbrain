"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useSession } from "@/app/context/SessionContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function Login() {
  const router = useRouter();
  const { user, refreshUser, logout } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  console.log("🟢 Login component rendu, user actuel:", user);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("🔹 Tentative de connexion avec email:", email);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: email, password }),
      });

      const data = await res.json();
      console.log("🔹 Réponse du serveur login:", data, "Status:", res.status);

      if (!res.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      if (data.token) {
        console.log("🔑 JWT reçu, sauvegarde dans localStorage");
        localStorage.setItem("token", data.token);
      }

      await refreshUser();
      console.log("🔹 refreshUser exécuté, nouvel user:", user);

      router.replace("/");
    } catch (err: unknown) {
      console.error("❌ Erreur login:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue");
      }
    }    
  };

  if (user) {
    return (
      <>
        <p>Connecté en tant que {user.userEmail}</p>
        <button
          onClick={() => {
            logout();
            localStorage.removeItem("token");
            console.log("🚪 Déconnexion, token supprimé");
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Se déconnecter
        </button>
      </>
    );
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-3 max-w-md mx-auto text-[var(--text-main-light)] dark:text-[var(--text-main-dark)]"
    >
      <h1 className="text-center mb-5 text-2xl font-semibold">Se connecter</h1>

      <input
        className="rounded-xl p-3 bg-[var(--bg-high-light)] dark:bg-[var(--bg-high-dark)]"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="relative">
        <input
          className="rounded-xl p-3 pr-12 w-full bg-[var(--bg-high-light)] dark:bg-[var(--bg-high-dark)]"
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
        >
          {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center rounded-xl p-3 bg-[var(--color-light)] dark:bg-[var(--color-dark)] gap-2 cursor-pointer mt-5"
      >
        Se connecter <ChevronRight />
      </button>

      {error && <p className="text-red-600 text-center mt-3">{error}</p>}
    </form>
  );
}
