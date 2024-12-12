-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartToClass_V" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_user_id_key" ON "Cart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToClass_V_AB_unique" ON "_CartToClass_V"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToClass_V_B_index" ON "_CartToClass_V"("B");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToClass_V" ADD CONSTRAINT "_CartToClass_V_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToClass_V" ADD CONSTRAINT "_CartToClass_V_B_fkey" FOREIGN KEY ("B") REFERENCES "Class_V"("id") ON DELETE CASCADE ON UPDATE CASCADE;
