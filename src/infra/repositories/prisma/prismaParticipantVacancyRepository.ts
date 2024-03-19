import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { ParticipantVacancyRepository } from '@app/repositories/ParticipantVacancy';
import { ParticipantVacancyMapper } from '@infra/mappers/participantVacancy.mapper';

@Injectable()
export class PrismaParticipantVacancyRepository
  implements ParticipantVacancyRepository
{
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(participantVacancy: ParticipantVacancyE): Promise<void> {
    const prismaParticipantVacancy =
      ParticipantVacancyMapper.toPrisma(participantVacancy);
    await this.prisma.participantVacancy.create({
      data: prismaParticipantVacancy,
    });
  }

  async findById(id: string): Promise<ParticipantVacancyE> {
    const participantVacancy = await this.prisma.participantVacancy.findUnique({
      where: { id },
    });
    return participantVacancy
      ? ParticipantVacancyMapper.toDomain(participantVacancy)
      : null;
  }

  async findByVacancy(idVacancy: string): Promise<ParticipantVacancyE[]> {
    const participantVacancies = await this.prisma.participantVacancy.findMany({
      where: { idVacancy },
    });
    return participantVacancies.map(ParticipantVacancyMapper.toDomain);
  }





  async validateData(data: any): Promise<boolean> {
    const { cpf, email, phone, rg, idVacancy } = data;

    const existingRows = await this.prisma.participantVacancy.count({
      where: {
        OR: [
          { cpf, idVacancy },
          { email, idVacancy },
          { phone, idVacancy },
          { rg, idVacancy }
        ]
      },
    });

    // Verificar se algum dos campos já existe na base de dados para a idVacancy específica
    if (existingRows !== 0) {
      return true; // Dados já existem para a idVacancy específica
    }

    return false; // Dados não existem para a idVacancy específica
  }

  async findAll(isActive?: boolean): Promise<ParticipantVacancyE[]> {
    const participantVacancies =
      await this.prisma.participantVacancy.findMany();
    return participantVacancies.map(ParticipantVacancyMapper.toDomain);
  }

  async update(participantVacancy: ParticipantVacancyE): Promise<void> {
    const prismaParticipantVacancy =
      ParticipantVacancyMapper.toPrisma(participantVacancy);
    await this.prisma.participantVacancy.update({
      where: { id: prismaParticipantVacancy.id },
      data: prismaParticipantVacancy,
    });
  }
}
