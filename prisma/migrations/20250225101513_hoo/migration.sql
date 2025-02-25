-- CreateTable
CREATE TABLE "Connections" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "followers" INTEGER[],
    "following" INTEGER[],

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);
