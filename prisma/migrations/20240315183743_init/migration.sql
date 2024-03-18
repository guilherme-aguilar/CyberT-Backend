/*
  Warnings:

  - Added the required column `sector` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "sector" TEXT NOT NULL;
