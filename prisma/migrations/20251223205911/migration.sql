/*
  Warnings:

  - You are about to drop the column `description` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "description";
