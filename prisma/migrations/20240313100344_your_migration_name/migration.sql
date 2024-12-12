-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "my_id" INTEGER NOT NULL,
    "peer_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_my_id_fkey" FOREIGN KEY ("my_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_peer_id_fkey" FOREIGN KEY ("peer_id") REFERENCES "Friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
