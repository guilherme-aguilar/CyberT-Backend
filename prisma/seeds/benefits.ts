import { PrismaClient } from "@prisma/client";

export async function createInitialBenefits(prisma : PrismaClient) {
  const telas = await prisma.benefits.createMany({
    data: [
      {
        name: "1 Tela CyberTV"
      },
      {
        name: "2 telas CyberTV"
      },
      {
        name: "3 telas CyberTV"
      }
    ]
  });

  const othersBenefits = await prisma.benefits.createMany({
    data: [
      {
        name: "Internet 100% Fibra"
      },
      {
        name: "Sem limite de dados"
      },
      {
        name: "Instalação gratuita"
      },
      {
        name: "Suporte gratuito"
      },
      {
        name: "Atendimento Humanizado"
      }
    ]
  });
  return {
    cyberTV :  telas,
    benefits: othersBenefits
  }
}
