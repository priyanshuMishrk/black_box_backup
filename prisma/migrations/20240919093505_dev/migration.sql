/*
  Warnings:

  - You are about to drop the column `upi` on the `Class_V` table. All the data in the column will be lost.
  - You are about to drop the column `upi` on the `Course_V` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class_V" DROP COLUMN "upi";

-- AlterTable
ALTER TABLE "Course_V" DROP COLUMN "upi";

-- AlterTable
ALTER TABLE "Public_Post" ADD COLUMN     "videos" TEXT[] DEFAULT ARRAY[]::TEXT[];
