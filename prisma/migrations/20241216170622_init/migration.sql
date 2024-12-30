/*
  Warnings:

  - A unique constraint covering the columns `[slackUser]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "slackUser" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_slackUser_key" ON "Users"("slackUser");
