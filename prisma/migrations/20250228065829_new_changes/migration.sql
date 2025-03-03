/*
  Warnings:

  - The primary key for the `KeepAlive` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `KeepAlive` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `description` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('WAITING', 'SENT', 'READ');

-- AlterTable
ALTER TABLE "KeepAlive" DROP CONSTRAINT "KeepAlive_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "KeepAlive_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "message",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "sentAt" TIMESTAMP(3),
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'WAITING',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;
