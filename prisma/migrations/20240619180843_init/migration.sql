-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),
    "hach_refresh_token" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requests" TEXT NOT NULL,
    "desirable" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabled_at" TIMESTAMP(3)
);

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
    "idProfileBandwidth" TEXT,
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

-- CreateTable
CREATE TABLE "basicConfiguration" (
    "urlCentralCliente" TEXT NOT NULL DEFAULT 'http://localhost',
    "urlSpeedTest" TEXT NOT NULL,
    "urlMinhaConexao" TEXT NOT NULL,
    "urlFacebook" TEXT NOT NULL,
    "urlInstagram" TEXT NOT NULL,
    "urlWhatsapp" TEXT NOT NULL,
    "emailAtendimento" TEXT NOT NULL,
    "emailComercial" TEXT NOT NULL,
    "telefonePrincipal" TEXT NOT NULL,
    "urlLocalizacao" TEXT NOT NULL,
    "multipleCitys" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_id_key" ON "Vacancy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantVacancy_id_key" ON "ParticipantVacancy"("id");

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

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlCentralCliente_key" ON "basicConfiguration"("urlCentralCliente");

-- AddForeignKey
ALTER TABLE "ParticipantVacancy" ADD CONSTRAINT "ParticipantVacancy_idVacancy_fkey" FOREIGN KEY ("idVacancy") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plains" ADD CONSTRAINT "plains_idProfileBandwidth_fkey" FOREIGN KEY ("idProfileBandwidth") REFERENCES "profileBandwidth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsBenefits" ADD CONSTRAINT "plainsBenefits_idPlains_fkey" FOREIGN KEY ("idPlains") REFERENCES "plains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsBenefits" ADD CONSTRAINT "plainsBenefits_idBenefits_fkey" FOREIGN KEY ("idBenefits") REFERENCES "benefits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsLocations" ADD CONSTRAINT "plainsLocations_idPlains_fkey" FOREIGN KEY ("idPlains") REFERENCES "plains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plainsLocations" ADD CONSTRAINT "plainsLocations_idLocations_fkey" FOREIGN KEY ("idLocations") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
