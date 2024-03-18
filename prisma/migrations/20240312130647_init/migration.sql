/*
  Warnings:

  - Added the required column `urlLocalizcao` to the `basicConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "basicConfiguration_TelefonePrincipal_key";

-- DropIndex
DROP INDEX "basicConfiguration_emailAtendimento_key";

-- DropIndex
DROP INDEX "basicConfiguration_emailComercial_key";

-- DropIndex
DROP INDEX "basicConfiguration_urlFacebook_key";

-- DropIndex
DROP INDEX "basicConfiguration_urlInstagram_key";

-- DropIndex
DROP INDEX "basicConfiguration_urlMinhaConexao_key";

-- DropIndex
DROP INDEX "basicConfiguration_urlSpeedTest_key";

-- DropIndex
DROP INDEX "basicConfiguration_urlWhatsapp_key";

-- AlterTable
ALTER TABLE "basicConfiguration" ADD COLUMN     "urlLocalizcao" TEXT NOT NULL,
ALTER COLUMN "urlCentralCliente" SET DEFAULT 'http://localhost';
