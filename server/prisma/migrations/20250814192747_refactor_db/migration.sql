/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accountName` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accountTypeId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userFirstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userLastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AccountType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserContact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_contactTypeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountId_fkey";

-- DropForeignKey
ALTER TABLE "UserContact" DROP CONSTRAINT "UserContact_contactId_fkey";

-- DropForeignKey
ALTER TABLE "UserContact" DROP CONSTRAINT "UserContact_userId_fkey";

-- DropIndex
DROP INDEX "User_accountId_key";

-- DropIndex
DROP INDEX "User_userEmail_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "accountId",
DROP COLUMN "accountName",
DROP COLUMN "accountTypeId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "deletedBy" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedBy" INTEGER,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountId",
DROP COLUMN "emailVerified",
DROP COLUMN "userEmail",
DROP COLUMN "userFirstName",
DROP COLUMN "userLastName",
DROP COLUMN "userPassword",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "AccountType";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "ContactType";

-- DropTable
DROP TABLE "UserContact";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" SERIAL NOT NULL,
    "userIdRef" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" SERIAL NOT NULL,
    "userIdRef" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
