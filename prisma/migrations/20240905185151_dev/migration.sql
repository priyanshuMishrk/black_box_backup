-- CreateTable
CREATE TABLE "Liked_Post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Liked_Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_mark_Post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Book_mark_Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Liked_PostToPublic_Post" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Book_mark_PostToPublic_Post" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Liked_Post_user_id_key" ON "Liked_Post"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_mark_Post_user_id_key" ON "Book_mark_Post"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_Liked_PostToPublic_Post_AB_unique" ON "_Liked_PostToPublic_Post"("A", "B");

-- CreateIndex
CREATE INDEX "_Liked_PostToPublic_Post_B_index" ON "_Liked_PostToPublic_Post"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Book_mark_PostToPublic_Post_AB_unique" ON "_Book_mark_PostToPublic_Post"("A", "B");

-- CreateIndex
CREATE INDEX "_Book_mark_PostToPublic_Post_B_index" ON "_Book_mark_PostToPublic_Post"("B");

-- AddForeignKey
ALTER TABLE "Liked_Post" ADD CONSTRAINT "Liked_Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_mark_Post" ADD CONSTRAINT "Book_mark_Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Liked_PostToPublic_Post" ADD CONSTRAINT "_Liked_PostToPublic_Post_A_fkey" FOREIGN KEY ("A") REFERENCES "Liked_Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Liked_PostToPublic_Post" ADD CONSTRAINT "_Liked_PostToPublic_Post_B_fkey" FOREIGN KEY ("B") REFERENCES "Public_Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Book_mark_PostToPublic_Post" ADD CONSTRAINT "_Book_mark_PostToPublic_Post_A_fkey" FOREIGN KEY ("A") REFERENCES "Book_mark_Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Book_mark_PostToPublic_Post" ADD CONSTRAINT "_Book_mark_PostToPublic_Post_B_fkey" FOREIGN KEY ("B") REFERENCES "Public_Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
