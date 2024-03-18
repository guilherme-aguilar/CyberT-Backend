/*
  Warnings:

  - You are about to drop the column `urlLocalizcao` on the `basicConfiguration` table. All the data in the column will be lost.
  - Added the required column `urlLocalizacao` to the `basicConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "basicConfiguration" DROP COLUMN "urlLocalizcao",
ADD COLUMN     "urlLocalizacao" TEXT NOT NULL;
