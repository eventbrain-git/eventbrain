-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_createdBy_fkey";

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
