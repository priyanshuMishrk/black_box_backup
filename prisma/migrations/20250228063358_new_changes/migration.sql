-- CreateTable
CREATE TABLE "KeepAlive" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "isAlive" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeepAlive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeepAlive_userId_key" ON "KeepAlive"("userId");
