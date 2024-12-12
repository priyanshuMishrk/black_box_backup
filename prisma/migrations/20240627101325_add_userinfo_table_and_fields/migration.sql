-- CreateTable
CREATE TABLE "Class_V" (
    "id" SERIAL NOT NULL,
    "languageOfClass" TEXT,
    "trainer_id" INTEGER NOT NULL,
    "date" JSONB,
    "title" TEXT,
    "description" TEXT,
    "trainerBio" TEXT,
    "classStructure" TEXT,
    "studentsWho" TEXT,
    "requirements" TEXT,
    "studentLim" TEXT,
    "price" TEXT,
    "currency" TEXT,
    "accN" TEXT,
    "bankN" TEXT,
    "holderN" TEXT,
    "accTpe" TEXT,
    "ifsc" TEXT,
    "upi" TEXT,
    "img" JSONB,
    "free" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Class_V_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Completed_Class" (
    "id" SERIAL NOT NULL,
    "languageOfClass" TEXT,
    "trainer_id" INTEGER NOT NULL,
    "date" JSONB,
    "title" TEXT,
    "description" TEXT,
    "trainerBio" TEXT,
    "classStructure" TEXT,
    "studentsWho" TEXT,
    "requirements" TEXT,
    "studentLim" TEXT,
    "price" TEXT,
    "currency" TEXT,
    "accN" TEXT,
    "bankN" TEXT,
    "holderN" TEXT,
    "accTpe" TEXT,
    "ifsc" TEXT,
    "upi" TEXT,
    "img" JSONB,
    "free" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Completed_Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class_V" ADD CONSTRAINT "Class_V_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Completed_Class" ADD CONSTRAINT "Completed_Class_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
