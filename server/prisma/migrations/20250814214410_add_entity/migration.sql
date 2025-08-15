/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Client` table. All the data in the column will be lost.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserAuth` table. All the data in the column will be lost.
  - You are about to drop the column `userIdRef` on the `UserAuth` table. All the data in the column will be lost.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserProfile` table. All the data in the column will be lost.
  - The primary key for the `UserSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserSession` table. All the data in the column will be lost.
  - You are about to drop the column `userIdRef` on the `UserSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAuthId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityId` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusDescription` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusName` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAuthId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFirstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `UserAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `UserAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileDescription` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `UserSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "accountId" SERIAL NOT NULL,
ADD COLUMN     "accountName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId");

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "clientId" SERIAL NOT NULL,
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("clientId");

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "entityId" INTEGER NOT NULL,
ADD COLUMN     "statusDescription" TEXT NOT NULL,
ADD COLUMN     "statusId" SERIAL NOT NULL,
ADD COLUMN     "statusName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("statusId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "deletedBy" INTEGER,
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "updatedBy" INTEGER,
ADD COLUMN     "userAuthId" INTEGER NOT NULL,
ADD COLUMN     "userFirstName" TEXT NOT NULL,
ADD COLUMN     "userLastName" TEXT NOT NULL,
ADD COLUMN     "userProfileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserAuth" DROP CONSTRAINT "UserAuth_pkey",
DROP COLUMN "id",
DROP COLUMN "userIdRef",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userAuthId" SERIAL NOT NULL,
ADD CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("userAuthId");

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userProfileDescription" TEXT NOT NULL,
ADD COLUMN     "userProfileId" SERIAL NOT NULL,
ADD COLUMN     "userProfileName" TEXT NOT NULL,
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userProfileId");

-- AlterTable
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_pkey",
DROP COLUMN "id",
DROP COLUMN "userIdRef",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "userSessionId" SERIAL NOT NULL,
ADD CONSTRAINT "UserSession_pkey" PRIMARY KEY ("userSessionId");

-- CreateTable
CREATE TABLE "Type" (
    "typeId" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "typeDescription" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "Entity" (
    "entityId" SERIAL NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("entityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userAuthId_key" ON "User"("userAuthId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "UserAuth"("userAuthId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("typeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("statusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("typeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("entityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("entityId") ON DELETE RESTRICT ON UPDATE CASCADE;
