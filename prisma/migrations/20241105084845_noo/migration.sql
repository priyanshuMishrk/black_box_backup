-- CreateTable
CREATE TABLE "ClassroomUser_V2" (
    "id" SERIAL NOT NULL,
    "ClassroomId" INTEGER,
    "email_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "img_thumbnail" TEXT,
    "phone_number" TEXT,

    CONSTRAINT "ClassroomUser_V2_pkey" PRIMARY KEY ("id")
);
