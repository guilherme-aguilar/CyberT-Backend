-- CreateTable
CREATE TABLE "basicConfiguration" (
    "urlCentralCliente" TEXT NOT NULL,
    "urlSpeedTest" TEXT NOT NULL,
    "urlMinhaConexao" TEXT NOT NULL,
    "urlFacebook" TEXT NOT NULL,
    "urlInstagram" TEXT NOT NULL,
    "urlWhatsapp" TEXT NOT NULL,
    "emailAtendimento" TEXT NOT NULL,
    "emailComercial" TEXT NOT NULL,
    "TelefonePrincipal" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlCentralCliente_key" ON "basicConfiguration"("urlCentralCliente");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlSpeedTest_key" ON "basicConfiguration"("urlSpeedTest");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlMinhaConexao_key" ON "basicConfiguration"("urlMinhaConexao");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlFacebook_key" ON "basicConfiguration"("urlFacebook");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlInstagram_key" ON "basicConfiguration"("urlInstagram");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_urlWhatsapp_key" ON "basicConfiguration"("urlWhatsapp");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_emailAtendimento_key" ON "basicConfiguration"("emailAtendimento");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_emailComercial_key" ON "basicConfiguration"("emailComercial");

-- CreateIndex
CREATE UNIQUE INDEX "basicConfiguration_TelefonePrincipal_key" ON "basicConfiguration"("TelefonePrincipal");
