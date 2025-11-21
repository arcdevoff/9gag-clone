-- CreateTable
CREATE TABLE "UserTopicSubscription" (
    "userId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTopicSubscription_pkey" PRIMARY KEY ("userId","topicId")
);

-- AddForeignKey
ALTER TABLE "UserTopicSubscription" ADD CONSTRAINT "UserTopicSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTopicSubscription" ADD CONSTRAINT "UserTopicSubscription_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
