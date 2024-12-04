-- CreateTable
CREATE TABLE "Classroom_V2" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    "email_type" TEXT NOT NULL,
    "planid" INTEGER NOT NULL,
    "iDU" BOOLEAN NOT NULL,

    CONSTRAINT "Classroom_V2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UsersRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_V2_email_type_key" ON "Classroom_V2"("email_type");

-- CreateIndex
CREATE UNIQUE INDEX "_UsersRelation_AB_unique" ON "_UsersRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersRelation_B_index" ON "_UsersRelation"("B");

-- AddForeignKey
ALTER TABLE "Classroom_V2" ADD CONSTRAINT "Classroom_V2_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersRelation" ADD CONSTRAINT "_UsersRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom_V2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersRelation" ADD CONSTRAINT "_UsersRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
