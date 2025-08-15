-- AlterTable
ALTER TABLE "Entity" ALTER COLUMN "entityDescription" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "statusDescription" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Type" ALTER COLUMN "typeDescription" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "userProfileDescription" DROP NOT NULL;
