/*
  Warnings:

  - You are about to drop the column `content` on the `bh_post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bh_post" DROP COLUMN "content",
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "markdown" TEXT;
