"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useSession } from "@/app/context/SessionContext";
import { useLoginMutation } from "@/state/api";

export default function Login() {
  const router = useRouter();
  const { user, refreshUser, logout } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // 🔹 nouvel état pour déclencher useEffect

  const [loginMutation, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginMutation({ login: email, password }).unwrap();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true); // 🔹 déclenche useEffect pour refreshUser
      }
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string }; message?: string };
      setError(errorObj.data?.message || errorObj.message || "Erreur inattendue");
    }
  };

  // 🔹 useEffect pour refreshUser après login
  useEffect(() => {
    if (loggedIn) {
      refreshUser().then((user) => {
        if (user) router.replace("/userHome");
        else setError("Impossible de récupérer l'utilisateur");
      });
    }
  }, [loggedIn, refreshUser, router]);

  if (user) {
    return (
      <>
        <p>Connecté en tant que {user.userEmail}</p>
        <button
          onClick={() => {
            logout();
            localStorage.removeItem("token");
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
        disabled={isLoading}
        className="flex items-center justify-center rounded-xl p-3 bg-[var(--color-light)] dark:bg-[var(--color-dark)] gap-2 cursor-pointer mt-5"
      >
        {isLoading ? "Connexion..." : "Se connecter"} <ChevronRight />
      </button>

      {error && <p className="text-red-600 text-center mt-3">{error}</p>}
    </form>
  );
}
