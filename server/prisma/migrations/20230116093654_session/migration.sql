-- CreateTable
CREATE TABLE "bh_session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "userAgent" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bh_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bh_session" ADD CONSTRAINT "bh_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "bh_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
