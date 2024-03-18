import { BasicConfiguraction } from '@app/models/basicConfig';
import { BasicConfigRepository } from '@app/repositories/basicConfigRepository';
import { BasicConfigMapper } from '@infra/mappers/basicConfig.mapper';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaBasicConfigRepository implements BasicConfigRepository {
  constructor(private prismaService: PrismaService) {}

  async update(request: BasicConfiguraction): Promise<void> {
    const row = BasicConfigMapper.toPrisma(request);

    await this.prismaService.basicConfiguration.updateMany({
      data: row,
    });
  }

  async search(): Promise<BasicConfiguraction> {

    const ValidationData = await this.prismaService.basicConfiguration.count();

    if (ValidationData === 0) {
      await this.prismaService.basicConfiguration.create({
        data: {
          emailAtendimento: 'atendimento@example.com',
          emailComercial: 'comercial@example.com',
          telefonePrincipal: '+55 123 456 7890',
          urlCentralCliente: 'https://www.example.com',
          urlFacebook: 'https://www.facebook.com',
          urlInstagram: 'https://www.instagram.com',
          urlMinhaConexao: 'https://minhaconexao.example.com',
          urlSpeedTest: 'https://speedtest.example.com',
          urlWhatsapp: 'https://api.whatsapp.com',
          urlLocalizacao: "https://maps.google.com/maps?width=600&height=600&hl=en&q=R. Sophia Fortini Costa, 303 - Nova Era Juiz de Fora - MG 36087-355&t=p&z=14&ie=UTF8&iwloc=B&output=embed"
        },
      });
    }

    const rowToPrisma = await this.prismaService.basicConfiguration.findFirst();

    return BasicConfigMapper.toDomain(rowToPrisma);
  }
}
