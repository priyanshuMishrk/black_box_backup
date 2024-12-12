-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Class_VToWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Course_VToWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_user_id_key" ON "Wishlist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_Class_VToWishlist_AB_unique" ON "_Class_VToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_Class_VToWishlist_B_index" ON "_Class_VToWishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Course_VToWishlist_AB_unique" ON "_Course_VToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_Course_VToWishlist_B_index" ON "_Course_VToWishlist"("B");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Class_VToWishlist" ADD CONSTRAINT "_Class_VToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Class_V"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Class_VToWishlist" ADD CONSTRAINT "_Class_VToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Course_VToWishlist" ADD CONSTRAINT "_Course_VToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Course_V"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Course_VToWishlist" ADD CONSTRAINT "_Course_VToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
