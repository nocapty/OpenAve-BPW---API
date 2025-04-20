
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Riders" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Riders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRiders" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "UserRiders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRiders" ADD CONSTRAINT "UserRiders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRiders" ADD CONSTRAINT "UserRiders_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Riders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
