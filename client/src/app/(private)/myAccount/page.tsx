"use client";

import React from "react";
import { useSession } from "@/app/context/SessionContext";
import { useGetUserQuery } from "@/state/api";
import { SquarePen } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query/react";

const capitalize = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

const MyAccountPage = () => {
  const { user: sessionUser, loading: sessionLoading } = useSession();

  // Récupération de l'ID utilisateur si disponible
  const userId = sessionUser?.userId;

  // Hook RTK Query avec skipToken si userId non défini
  const {
    data: apiUser,
    isLoading: apiLoading,
    error: apiError,
  } = useGetUserQuery(userId ?? skipToken);

  if (sessionLoading || (!apiUser && apiLoading)) {
    return <p className="text-center mt-10">Chargement des données...</p>;
  }

  if (!sessionUser || !sessionUser.userId) {
    return (
      <p className="text-center mt-10 text-red-500">
        Vous n&apos;êtes pas connecté ou identifiant manquant.
      </p>
    );
  }

  if (apiError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Erreur lors de la récupération des données.
      </p>
    );
  }

  if (!apiUser) {
    return (
      <p className="text-center mt-10 text-red-500">
        Utilisateur introuvable.
      </p>
    );
  }

  const userData = apiUser; // <-- juste apiUser directement

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[var(--bg-high-light)] dark:bg-[var(--bg-high-dark)] rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Profil utilisateur</h1>
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-light)] dark:bg-[var(--color-dark)] text-white text-2xl font-bold">
          {capitalize(userData.userFirstName).charAt(0)}
          {capitalize(userData.userLastName).charAt(0)}
        </div>
        <div>
          <div className="flex gap-2">
            <div
              className={
                userData.profile.userProfileName.toLowerCase().includes("admin")
                  ? "bg-red-500/50 px-1 rounded"
                  : "bg-[var(--color-light)] dark:bg-[var(--color-dark)] px-1 rounded"
              }
            >
              {userData.profile.userProfileName}
            </div>
          </div>
          <p className="text-lg font-semibold">
            {capitalize(userData.userFirstName)} {capitalize(userData.userLastName)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Email</p>
          <p className="text-lg font-medium">email..</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Compte</p>
          <p className="text-lg font-medium">{userData.account.accountName}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="flex gap-2 px-6 py-3 bg-[var(--color-light)] dark:bg-[var(--color-dark)] text-white rounded-xl font-semibold hover:brightness-110 transition">
          <SquarePen /> Modifier mes informations
        </button>
      </div>
    </div>
  );
};

export default MyAccountPage;
