/*
  Warnings:

  - You are about to drop the `Register` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Register";

-- CreateTable
CREATE TABLE "Entry" (
    "id" STRING NOT NULL,
    "interiorTemp" FLOAT8 NOT NULL,
    "exteriorTemp" FLOAT8 NOT NULL,
    "soilMoisture" FLOAT8 NOT NULL,
    "airHumidity" INT4 NOT NULL,
    "batteryLevel" INT4 NOT NULL,
    "ambBrightness" INT4 NOT NULL,
    "date" STRING NOT NULL,
    "plantId" STRING NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" STRING NOT NULL,
    "userId" STRING,
    "name" STRING NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
