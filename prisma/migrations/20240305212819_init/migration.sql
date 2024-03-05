-- CreateTable
CREATE TABLE "curriculum" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "patio" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),
    "disabled_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "education" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "duration" TEXT,
    "completed_on" TIMESTAMP(3) NOT NULL,
    "arquive" TEXT,
    "curriculum_id" TEXT NOT NULL,
    "disabled_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "typeEducation" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "selectProcess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "vacancyIssuer" TEXT NOT NULL,
    "open_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "vacancyParticipations" (
    "idVacancy" TEXT NOT NULL,
    "idCurriculum" TEXT NOT NULL,

    CONSTRAINT "vacancyParticipations_pkey" PRIMARY KEY ("idCurriculum","idVacancy")
);

-- CreateTable
CREATE TABLE "shop" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "main_point" BOOLEAN NOT NULL,
    "disabled_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT,
    "street" TEXT,
    "idShop" TEXT,
    "disabled_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "plains" (
    "id" TEXT NOT NULL,
    "visibleName" TEXT NOT NULL,
    "internalName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "discountPrice" TEXT,
    "idProfileBandwidth" TEXT NOT NULL,
    "disabled_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "profileBandwidth" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uploadBandwidth" TEXT NOT NULL,
    "downloadBandwidth" TEXT NOT NULL,
    "disabled_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "benefits" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "plainsBenefits" (
    "idPlains" TEXT NOT NULL,
    "idBenefits" TEXT NOT NULL,

    CONSTRAINT "plainsBenefits_pkey" PRIMARY KEY ("idBenefits","idPlains")
);

-- CreateTable
CREATE TABLE "plainsLocations" (
    "idPlains" TEXT NOT NULL,
    "idLocations" TEXT NOT NULL,

    CONSTRAINT "plainsLocations_pkey" PRIMARY KEY ("idLocations","idPlains")
);

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_id_key" ON "curriculum"("id");

-- CreateIndex
CREATE UNIQUE INDEX "education_id_key" ON "education"("id");

-- CreateIndex
CREATE UNIQUE INDEX "typeEducation_name_key" ON "typeEducation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "selectProcess_id_key" ON "selectProcess"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_id_key" ON "shop"("id");

-- CreateIndex
CREATE UNIQUE INDEX "locations_id_key" ON "locations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "plains_id_key" ON "plains"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profileBandwidth_id_key" ON "profileBandwidth"("id");

-- CreateIndex
CREATE UNIQUE INDEX "benefits_id_key" ON "benefits"("id");

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_curriculum_id_fkey" FOREIGN KEY ("curriculum_id") REFERENCES "curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_type_fkey" FOREIGN KEY ("type") REFERENCES "typeEducation"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancyParticipations" ADD CONSTRAINT "vacancyParticipations_idCurriculum_fkey" FOREIGN KEY ("idCurriculum") REFERENCES "curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancyParticipations" ADD CONSTRAINT "vacancyParticipations_idVacancy_fkey" FOREIGN KEY ("idVacancy") REFERENCES "selectProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plains" ADD CONSTRAINT "plains_idProfileBandwidth_fkey" FOREIGN KEY ("idProfileBandwidth") REFERENCES "profileBandwidth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsBenefits" ADD CONSTRAINT "plainsBenefits_idPlains_fkey" FOREIGN KEY ("idPlains") REFERENCES "plains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsBenefits" ADD CONSTRAINT "plainsBenefits_idBenefits_fkey" FOREIGN KEY ("idBenefits") REFERENCES "benefits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsLocations" ADD CONSTRAINT "plainsLocations_idPlains_fkey" FOREIGN KEY ("idPlains") REFERENCES "plains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsLocations" ADD CONSTRAINT "plainsLocations_idLocations_fkey" FOREIGN KEY ("idLocations") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
