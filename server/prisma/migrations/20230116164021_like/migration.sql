-- CreateTable
CREATE TABLE "bh_like" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "bh_like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bh_like" ADD CONSTRAINT "bh_like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "bh_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bh_like" ADD CONSTRAINT "bh_like_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "bh_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
