/*
  Warnings:

  - You are about to drop the `AccessToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `randomCode` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccessToken" DROP CONSTRAINT "AccessToken_plantId_fkey";

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "randomCode" STRING NOT NULL;

-- DropTable
DROP TABLE "AccessToken";
