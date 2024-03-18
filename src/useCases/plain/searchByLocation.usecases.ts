import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { PlainsLocationsRepository } from '@app/repositories/PlainsLocationsRepository';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idLocations: string;
}

interface Response {
  data: {
    id: string;
    internalName: string;
    visibleName: string;
    price: string;
    discountPrice: string;
    benefits: string[];
  }[];
}

@Injectable()
export class GetByLocation_Plain {
  constructor(
    private PlainRepository: plainRepository,
    private PlainLocationRepository: PlainsLocationsRepository,
    private PlainBenefitsRepository: PlainsBenefitsRepository,
    private BenefitsRepository: benefitsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const idLocations = request.idLocations;

    // Obtém as informações sobre a localidade
    const dataPlainLocations = await this.PlainLocationRepository.getByLocation(idLocations);

    // Obtém todos os planos
    const dataPlains = await this.PlainRepository.get(true);

    const responseData = [];

    // Loop através dos planos
    for (const plain of dataPlains) {
      // Verifica se o plano pertence à localidade desejada
      if (dataPlainLocations.some(location => location.idPlains === plain.id)) {
        let benefits = [];

        // Busca os benefícios ID vinculados ao plano
        const dataBenefitsToPlain = await this.PlainBenefitsRepository.getByPlain(plain.id);

        // Busca todos os benefícios
        const dataBenefits = await this.BenefitsRepository.get();

        // Filtra todos os benefícios que o plano possui
        const benefitNames = dataBenefits
          .filter((benefit) =>
            dataBenefitsToPlain.some((item) => item.idBenefits === benefit.id),
          )
          .map((benefit) => benefit.name);

        benefits = benefitNames;

        // Adiciona os detalhes do plano à resposta
        responseData.push({
          id: plain.id,
          internalName: plain.internalName,
          visibleName: plain.visibleName,
          price: plain.price,
          discountPrice: plain.discountPrice,
          benefits: benefits,
        });
      }
    }

    return {
      data: responseData,
    };
  }
}
