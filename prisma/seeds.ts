import { PrismaClient } from '@prisma/client'
import { createBasicConfiguration } from './seeds/basicConfiguration'
import { createInitialShops } from './seeds/shops'
import { createInitialUsers } from './seeds/user'
import { createInitialBenefits } from './seeds/benefits'
import { createInitialPlains } from './seeds/plains'


const prisma = new PrismaClient()

async function main() {

  try {
    
    await prisma.basicConfiguration.deleteMany()
    await prisma.shop.deleteMany()
    await prisma.user.deleteMany()
    await prisma.benefits.deleteMany()
    await prisma.plains.deleteMany()

    //Trabalhe conosco Clear
    await prisma.participantVacancy.deleteMany()
    await prisma.vacancy.deleteMany()

    //Locations
    await prisma.locations.deleteMany()

    //Profiles de Banda
    await prisma.profileBandwidth.deleteMany()

    console.log('Todas as tabelas foram truncadas com sucesso.');

    await createBasicConfiguration(prisma)
    await createInitialShops(prisma)
    await createInitialUsers(prisma)
    await createInitialBenefits(prisma)
    await createInitialPlains(prisma)

  } catch (error) {
    console.error('Erro ao truncar as tabelas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
