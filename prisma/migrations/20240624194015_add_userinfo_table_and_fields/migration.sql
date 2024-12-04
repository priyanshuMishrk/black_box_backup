/*
  Warnings:

  - The `interestedTags` column on the `User_Info` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User_Info" DROP COLUMN "interestedTags",
ADD COLUMN     "interestedTags" TEXT[];
