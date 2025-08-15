/*
  Warnings:

  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFirstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userName",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userFirstName" TEXT NOT NULL,
ADD COLUMN     "userLastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "accountId" SERIAL NOT NULL,
    "accountTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "AccountType" (
    "accountTypeId" SERIAL NOT NULL,
    "accountTypeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("accountTypeId")
);

-- CreateTable
CREATE TABLE "Contact" (
    "contactId" SERIAL NOT NULL,
    "contactTypeId" INTEGER NOT NULL,
    "contactValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contactId")
);

-- CreateTable
CREATE TABLE "UserContact" (
    "userContactId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "UserContact_pkey" PRIMARY KEY ("userContactId")
);

-- CreateTable
CREATE TABLE "ContactType" (
    "contactTypeId" SERIAL NOT NULL,
    "contactTypeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactType_pkey" PRIMARY KEY ("contactTypeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountType_accountTypeName_key" ON "AccountType"("accountTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "ContactType_contactTypeName_key" ON "ContactType"("contactTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "AccountType"("accountTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "ContactType"("contactTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContact" ADD CONSTRAINT "UserContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("contactId") ON DELETE RESTRICT ON UPDATE CASCADE;
