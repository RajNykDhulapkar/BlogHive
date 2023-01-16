/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `bh_tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `bh_tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "bh_tag_name_key";

-- AlterTable
ALTER TABLE "bh_tag" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bh_tag_slug_key" ON "bh_tag"("slug");
