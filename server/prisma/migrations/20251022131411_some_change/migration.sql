/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `EmailConfirmationToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailConfirmationToken" DROP COLUMN "expiresAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;
