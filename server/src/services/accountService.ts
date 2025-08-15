import { PrismaClient } from "@prisma/client";
import { getStatusById } from "./statusService";
import { getTypeById } from "./typeService";

const prisma = new PrismaClient();

export const getAccountById = async (accountId: number) => {
  if (isNaN(accountId)) {
    throw new Error("Account ID invalide");
  }

  const account = await prisma.account.findUnique({
    where: { accountId },
    select: {
      accountId: true,
      accountName: true,
      statusId: true,
      typeId: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  let status = null;
  if (account.statusId !== null) {
    status = await getStatusById(account.statusId);
  }

  let type = null;
  if (account.typeId !== null) {
    type = await getTypeById(account.typeId);
  }

  return { ...account, status, type };
};
