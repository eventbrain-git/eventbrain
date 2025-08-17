import { getAccountById } from "./accountService";
import { getStatusById } from "./statusService";
import { getUserProfileById } from "./userProfileService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (userId: number) => {
  console.log("🚀 getUserById appelé avec userId:", userId);

  if (isNaN(userId)) {
    console.error("❌ User ID invalide:", userId);
    throw new Error("User ID invalide");
  }

  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      userFirstName: true,
      userLastName: true,
      userProfileId: true,
      statusId: true,
      accountId: true,
    },
  });

  if (!user) {
    console.error("❌ Utilisateur non trouvé pour userId:", userId);
    throw new Error("User not found");
  }

  console.log("✅ Utilisateur trouvé:", user);

  let profile = null;
  if (user.userProfileId !== null) {
    profile = await getUserProfileById(user.userProfileId);
    console.log("🔹 Profile récupéré:", profile);
  } else {
    console.log("ℹ️ Pas de profile associé");
  }

  let status = null;
  if (user.statusId !== null) {
    status = await getStatusById(user.statusId);
    console.log("🔹 Status récupéré:", status);
  } else {
    console.log("ℹ️ Pas de status associé");
  }

  let account = null;
  if (user.accountId !== null) {
    account = await getAccountById(user.accountId);
    console.log("🔹 Account récupéré:", account);
  } else {
    console.log("ℹ️ Pas de compte associé");
  }

  const result = { ...user, profile, status, account };
  console.log("🚀 getUserById résultat final:", result);
  return result;
};
