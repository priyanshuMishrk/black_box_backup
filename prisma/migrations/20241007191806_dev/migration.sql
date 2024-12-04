-- CreateTable
CREATE TABLE "Classroom_Session_V2" (
    "id" SERIAL NOT NULL,
    "ClassroomId" INTEGER NOT NULL,
    "languageOfClass" TEXT,
    "date" JSONB,
    "title" TEXT,
    "description" TEXT,
    "trainerBio" TEXT,
    "sessionStructure" TEXT,
    "studentsWho" TEXT,
    "requirements" TEXT,
    "trainerMailId" TEXT,
    "img" JSONB,

    CONSTRAINT "Classroom_Session_V2_pkey" PRIMARY KEY ("id")
);
