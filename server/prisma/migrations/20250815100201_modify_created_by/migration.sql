-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "UserAuth" DROP CONSTRAINT "UserAuth_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_createdBy_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Entity" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Type" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserAuth" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
