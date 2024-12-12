/*
  Warnings:

  - You are about to drop the `_CartToClass_V` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Class_VToWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToClass_V" DROP CONSTRAINT "_CartToClass_V_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToClass_V" DROP CONSTRAINT "_CartToClass_V_B_fkey";

-- DropForeignKey
ALTER TABLE "_Class_VToWishlist" DROP CONSTRAINT "_Class_VToWishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_Class_VToWishlist" DROP CONSTRAINT "_Class_VToWishlist_B_fkey";

-- DropTable
DROP TABLE "_CartToClass_V";

-- DropTable
DROP TABLE "_Class_VToWishlist";

-- CreateTable
CREATE TABLE "_ClassCart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassCart_AB_unique" ON "_ClassCart"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassCart_B_index" ON "_ClassCart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassWishlist_AB_unique" ON "_ClassWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassWishlist_B_index" ON "_ClassWishlist"("B");

-- AddForeignKey
ALTER TABLE "_ClassCart" ADD CONSTRAINT "_ClassCart_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassCart" ADD CONSTRAINT "_ClassCart_B_fkey" FOREIGN KEY ("B") REFERENCES "Class_V"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassWishlist" ADD CONSTRAINT "_ClassWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Class_V"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassWishlist" ADD CONSTRAINT "_ClassWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
