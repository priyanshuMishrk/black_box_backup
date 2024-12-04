-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER DEFAULT 0,
    "user_id" INTEGER NOT NULL DEFAULT 0,
    "comment_body" TEXT NOT NULL DEFAULT '',
    "reply" BOOLEAN NOT NULL DEFAULT false,
    "reply_to" INTEGER NOT NULL DEFAULT 0,
    "edited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

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
