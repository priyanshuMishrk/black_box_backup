/*
  Warnings:

  - You are about to drop the column `my_id` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `peer_id` on the `Comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "my_id",
DROP COLUMN "peer_id",
ADD COLUMN     "comment_body" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "edited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "post_id" INTEGER DEFAULT 0,
ADD COLUMN     "reply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reply_to" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CommentReaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "react_to" INTEGER NOT NULL,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_react_to_fkey" FOREIGN KEY ("react_to") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
