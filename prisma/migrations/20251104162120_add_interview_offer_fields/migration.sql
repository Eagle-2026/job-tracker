/*
  Warnings:

  - You are about to drop the column `status` on the `JobApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "status",
ADD COLUMN     "interview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offer" BOOLEAN NOT NULL DEFAULT false;
