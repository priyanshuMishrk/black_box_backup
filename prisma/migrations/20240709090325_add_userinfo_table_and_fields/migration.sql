-- CreateTable
CREATE TABLE "Course_V" (
    "id" SERIAL NOT NULL,
    "languageOfClass" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "trainer_id" INTEGER NOT NULL,
    "date" JSONB,
    "title" TEXT,
    "description" TEXT,
    "trainerBio" TEXT,
    "classStructure" JSONB,
    "afterclassyouwillbe" TEXT,
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

    CONSTRAINT "Course_V_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Completed_Course" (
    "id" SERIAL NOT NULL,
    "languageOfClass" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "trainer_id" INTEGER NOT NULL,
    "date" JSONB,
    "title" TEXT,
    "description" TEXT,
    "trainerBio" TEXT,
    "classStructure" JSONB,
    "afterclassyouwillbe" TEXT,
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

    CONSTRAINT "Completed_Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartToCourse_V" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToCourse_V_AB_unique" ON "_CartToCourse_V"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToCourse_V_B_index" ON "_CartToCourse_V"("B");

-- AddForeignKey
ALTER TABLE "Course_V" ADD CONSTRAINT "Course_V_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Completed_Course" ADD CONSTRAINT "Completed_Course_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToCourse_V" ADD CONSTRAINT "_CartToCourse_V_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToCourse_V" ADD CONSTRAINT "_CartToCourse_V_B_fkey" FOREIGN KEY ("B") REFERENCES "Course_V"("id") ON DELETE CASCADE ON UPDATE CASCADE;
