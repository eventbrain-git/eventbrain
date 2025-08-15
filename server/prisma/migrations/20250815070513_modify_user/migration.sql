-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_createdBy_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
