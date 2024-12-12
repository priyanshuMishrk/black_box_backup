-- AlterTable
ALTER TABLE "User_Info" ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "skilss" TEXT[] DEFAULT ARRAY[]::TEXT[];
