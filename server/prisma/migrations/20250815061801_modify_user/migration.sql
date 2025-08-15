-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_statusId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userAuthId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userProfileId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountId" DROP NOT NULL,
ALTER COLUMN "statusId" DROP NOT NULL,
ALTER COLUMN "userAuthId" DROP NOT NULL,
ALTER COLUMN "userProfileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "UserAuth"("userAuthId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfileId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE SET NULL ON UPDATE CASCADE;
