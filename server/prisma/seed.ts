import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

type EntityJson = { entityName: string; entityDescription?: string };
type StatusJson = { statusName: string; statusDescription?: string; entityName: string };
type TypeJson = { typeName: string; typeDescription?: string; entityName: string };
type AccountJson = { accountName: string; typeName: string; statusName: string };
type UserProfileJson = { userProfileName: string; userProfileDescription: string };
type UserJson = {
  userFirstName: string;
  userLastName: string;
  userProfileName: string;
  statusName?: string;
  accountName: string;
};
type UserAuthJson = { userLastName: string; login: string; password: string };
type ArtistJson = { artistName: string };

async function deleteAllData(models: string[]) {
  for (const model of models) {
    const m: any = (prisma as any)[model];
    if (m) {
      await m.deleteMany({});
      console.log(`Cleared data from ${model}`);
    }
  }
}

function readJSON<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function main() {
  const dataDir = path.join(__dirname, "seedData");

  // -----------------------
  // Clear data
  // -----------------------
  await deleteAllData(["userAuth", "user", "account", "status", "type", "userProfile", "artist", "entity"]);

  // -----------------------
  // Seed entities
  // -----------------------
  const entitiesData = readJSON<EntityJson[]>(path.join(dataDir, "entity.json"));
  const entityMap = new Map<string, number>();

  for (const e of entitiesData) {
    const entity = await prisma.entity.create({
      data: {
        entityName: e.entityName,
        entityDescription: e.entityDescription ?? "",
      },
    });
    entityMap.set(entity.entityName, entity.entityId);
  }
  console.log(`Inserted ${entityMap.size} entities`);

  // -----------------------
  // Seed status
  // -----------------------
  const statusData = readJSON<StatusJson[]>(path.join(dataDir, "status.json"));
  const statusMap = new Map<string, number>();

  for (const s of statusData) {
    const entityId = entityMap.get(s.entityName);
    if (!entityId) throw new Error(`Entity not found for status "${s.statusName}" (entity="${s.entityName}")`);

    const status = await prisma.status.create({
      data: {
        statusName: s.statusName,
        statusDescription: s.statusDescription ?? "",
        entityId,
      },
    });

    statusMap.set(`${s.entityName}:${s.statusName}`, status.statusId);
  }
  console.log(`Inserted ${statusMap.size} statuses`);

  // -----------------------
  // Seed types
  // -----------------------
  const typeData = readJSON<TypeJson[]>(path.join(dataDir, "type.json"));
  const typeMap = new Map<string, number>();

  for (const s of typeData) {
    const entityId = entityMap.get(s.entityName);
    if (!entityId) throw new Error(`Entity not found for type "${s.typeName}" (entity="${s.entityName}")`);

    const type = await prisma.type.create({
      data: {
        typeName: s.typeName,
        typeDescription: s.typeDescription ?? "",
        entityId,
      },
    });

    typeMap.set(`${s.entityName}:${s.typeName}`, type.typeId);
  }
  console.log(`Inserted ${typeMap.size} types`);

  // -----------------------
  // Seed accounts
  // -----------------------
  const accountData = readJSON<AccountJson[]>(path.join(dataDir, "account.json"));
  const accountMap = new Map<string, number>(); // key = accountName

  for (const s of accountData) {
    const statusId = statusMap.get(`Account status:${s.statusName}`);
    if (!statusId) throw new Error(`Status not found for account "${s.accountName}"`);

    const typeId = typeMap.get(`Account type:${s.typeName}`);
    if (!typeId) throw new Error(`Type not found for account "${s.accountName}"`);

    const account = await prisma.account.create({
      data: {
        accountName: s.accountName,
        statusId,
        typeId,
      },
    });

    accountMap.set(s.accountName, account.accountId);
  }
  console.log(`Inserted ${accountData.length} accounts`);

  // -----------------------
  // Seed user profiles
  // -----------------------
  const profilesData = readJSON<UserProfileJson[]>(path.join(dataDir, "userProfile.json"));
  const profileMap = new Map<string, number>();

  for (const p of profilesData) {
    const profile = await prisma.userProfile.create({ data: p });
    profileMap.set(profile.userProfileName, profile.userProfileId);
  }
  console.log(`Inserted ${profileMap.size} userProfiles`);

  // -----------------------
  // Seed users
  // -----------------------
  const usersData = readJSON<UserJson[]>(path.join(dataDir, "user.json"));
  const users: { userId: number; userLastName: string }[] = [];

  for (const u of usersData) {
    const userProfileId = profileMap.get(u.userProfileName);
    if (!userProfileId) throw new Error(`Profile not found for user "${u.userFirstName} ${u.userLastName}"`);

    const accountId = accountMap.get(u.accountName);
    if (!accountId) throw new Error(`Account not found for user "${u.userFirstName} ${u.userLastName}"`);

    const userStatusId =
      u.statusName ? statusMap.get(`User status:${u.statusName}`) : undefined;
    if (u.statusName && !userStatusId) {
      throw new Error(
        `Status "${u.statusName}" not found for entity "User status" (user="${u.userFirstName} ${u.userLastName}")`
      );
    }

    const user = await prisma.user.create({
      data: {
        userFirstName: u.userFirstName,
        userLastName: u.userLastName,
        userProfileId,
        ...(userStatusId ? { statusId: userStatusId } : {}),
        accountId,
      },
    });

    users.push({ userId: user.userId, userLastName: user.userLastName });
  }
  console.log(`Inserted ${users.length} users`);

  // -----------------------
  // Seed user auths
  // -----------------------
  const userAuthData = readJSON<UserAuthJson[]>(path.join(dataDir, "userAuth.json"));

  for (const auth of userAuthData) {
    const user = users.find((u) => u.userLastName === auth.userLastName);
    if (!user) {
      console.warn(`No user found for auth entry (lastName="${auth.userLastName}") → skipped`);
      continue;
    }

    await prisma.userAuth.create({
      data: {
        login: auth.login,
        password: bcrypt.hashSync(auth.password, 10),
        user: { connect: { userId: user.userId } },
      },
    });
  }
  console.log("UserAuth seeded");

  // -----------------------
  // Seed artists
  // -----------------------
  const artistsData = readJSON<ArtistJson[]>(path.join(dataDir, "artist.json"));
  let artistCount = 0;
  for (const a of artistsData) {
    await prisma.artist.create({ data: { artistName: a.artistName } });
    artistCount++;
  }
  console.log(`Inserted ${artistCount} artists`);

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
