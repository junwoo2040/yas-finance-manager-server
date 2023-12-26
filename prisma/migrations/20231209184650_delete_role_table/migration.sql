/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoleJoin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRoleJoin" DROP CONSTRAINT "UserRoleJoin_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoleJoin" DROP CONSTRAINT "UserRoleJoin_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "UserRoleJoin";
