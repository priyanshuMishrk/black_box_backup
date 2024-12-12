-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('private', 'group');

-- CreateTable
CREATE TABLE "Chat_rooms" (
    "_id" TEXT NOT NULL,
    "type" "ChatType" NOT NULL,
    "participants" INTEGER[],
    "group_name" TEXT,
    "group_image" TEXT,
    "adminId" INTEGER,
    "last_message" TEXT,
    "last_message_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "on_call" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Chat_rooms_pkey" PRIMARY KEY ("_id")
);
