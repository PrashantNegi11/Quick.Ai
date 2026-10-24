/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Creations" DROP CONSTRAINT "Creations_user_id_fkey";

-- AlterTable
ALTER TABLE "Creations" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "User";
