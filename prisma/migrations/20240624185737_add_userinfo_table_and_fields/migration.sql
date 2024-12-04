-- CreateTable
CREATE TABLE "User_Info" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "whatBrings" TEXT,
    "currentIndustry" TEXT,
    "interestedTags" TEXT,
    "heardBy" TEXT,
    "dob" TEXT,
    "languages" TEXT[],
    "education" TEXT,
    "currentCompany" TEXT,
    "awards" JSONB,
    "flink" TEXT,
    "xlink" TEXT,
    "tubelink" TEXT,
    "linkedin" TEXT,

    CONSTRAINT "User_Info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Info" ADD CONSTRAINT "User_Info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
