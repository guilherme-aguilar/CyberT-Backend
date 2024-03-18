/*
  Warnings:

  - You are about to drop the `curriculum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `selectProcess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `typeEducation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vacancyParticipations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_curriculum_id_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_type_fkey";

-- DropForeignKey
ALTER TABLE "vacancyParticipations" DROP CONSTRAINT "vacancyParticipations_idCurriculum_fkey";

-- DropForeignKey
ALTER TABLE "vacancyParticipations" DROP CONSTRAINT "vacancyParticipations_idVacancy_fkey";

-- DropTable
DROP TABLE "curriculum";

-- DropTable
DROP TABLE "education";

-- DropTable
DROP TABLE "selectProcess";

-- DropTable
DROP TABLE "typeEducation";

-- DropTable
DROP TABLE "vacancyParticipations";

-- CreateTable
CREATE TABLE "ParticipantVacancy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled_at" TIMESTAMP(3),
    "idVacancy" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requests" TEXT NOT NULL,
    "desirable" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantVacancy_id_key" ON "ParticipantVacancy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_id_key" ON "Vacancy"("id");

-- AddForeignKey
ALTER TABLE "ParticipantVacancy" ADD CONSTRAINT "ParticipantVacancy_idVacancy_fkey" FOREIGN KEY ("idVacancy") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
