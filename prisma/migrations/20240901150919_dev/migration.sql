-- CreateTable
CREATE TABLE "Public_Post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "images" TEXT[],
    "private" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Public_Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Public_Post" ADD CONSTRAINT "Public_Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
