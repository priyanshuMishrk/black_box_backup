-- CreateTable
CREATE TABLE "Live_Streaming" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "live" BOOLEAN NOT NULL DEFAULT false,
    "streamStartedAt" TIMESTAMP(3),
    "streamEndedAt" TIMESTAMP(3),
    "highestViewCount" INTEGER,
    "liveViewCount" INTEGER,

    CONSTRAINT "Live_Streaming_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Live_Streaming" ADD CONSTRAINT "Live_Streaming_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
