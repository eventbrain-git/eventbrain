"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useLoginMutation, api, User } from "@/state/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loginMutation, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 🔹 Login pour obtenir JWT
      const loginResult = await loginMutation({ login: email, password }).unwrap();
      localStorage.setItem("jwt", loginResult.token);

      // 🔹 Dispatch getMe et unwrap
      const meResult = await dispatch(api.endpoints.getMe.initiate()).unwrap();

      if (meResult.user) {
        router.replace("/userHome");
      } else {
        setError("Impossible de récupérer l'utilisateur après connexion");
      }
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { data?: { message?: string }; message?: string };
      setError(errorObj?.data?.message || errorObj?.message || "Erreur inattendue");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-3 max-w-md mx-auto text-[var(--text-main-light)] dark:text-[var(--text-main-dark)] mt-10"
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
