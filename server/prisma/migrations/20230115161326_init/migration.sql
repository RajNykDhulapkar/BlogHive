-- CreateEnum
CREATE TYPE "PostMediaType" AS ENUM ('IMAGE_BANNER', 'IMAGE_CONTENT', 'VIDEO');

-- CreateTable
CREATE TABLE "bh_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bh_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bh_profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "profileImage" TEXT,
    "bannerImage" TEXT,

    CONSTRAINT "bh_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bh_post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bh_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bh_tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bh_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bh_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "bh_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bh_comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bh_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bh_post_media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "caption" TEXT,

    CONSTRAINT "bh_post_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "bh_user_email_key" ON "bh_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bh_profile_userId_key" ON "bh_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bh_post_slug_key" ON "bh_post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "bh_tag_name_key" ON "bh_tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bh_category_slug_key" ON "bh_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "bh_profile" ADD CONSTRAINT "bh_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "bh_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_post" ADD CONSTRAINT "bh_post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "bh_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_post" ADD CONSTRAINT "bh_post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "bh_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_comment" ADD CONSTRAINT "bh_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "bh_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_comment" ADD CONSTRAINT "bh_comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "bh_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_comment" ADD CONSTRAINT "bh_comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "bh_comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_post_media" ADD CONSTRAINT "bh_post_media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "bh_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "bh_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "bh_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
