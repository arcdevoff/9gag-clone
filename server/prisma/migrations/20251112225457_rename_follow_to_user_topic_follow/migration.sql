/*
  Warnings:

  - You are about to drop the `UserTopicSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserTopicSubscription" DROP CONSTRAINT "UserTopicSubscription_topicId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserTopicSubscription" DROP CONSTRAINT "UserTopicSubscription_userId_fkey";

-- DropTable
DROP TABLE "public"."UserTopicSubscription";

-- CreateTable
CREATE TABLE "UserTopicFollow" (
    "userId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTopicFollow_pkey" PRIMARY KEY ("userId","topicId")
);

-- AddForeignKey
ALTER TABLE "UserTopicFollow" ADD CONSTRAINT "UserTopicFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTopicFollow" ADD CONSTRAINT "UserTopicFollow_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
