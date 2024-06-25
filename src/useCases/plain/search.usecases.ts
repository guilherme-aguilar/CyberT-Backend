import { Plain } from '@app/models/plains';
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  isActive?: boolean;
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
export class Get_Plain {
  constructor(
    private repository: plainRepository,
    private PlainBenefitsRepository: PlainsBenefitsRepository,
    private BenefitsRepository: benefitsRepository,
  ) {}

  async execute(request: Request = { isActive: true }): Promise<Response> {

    const isActive = request?.isActive;

    const data = await this.repository.get(isActive);

    const responseData = [];

    // Loop através dos planos
    for (const plain of data) {
      // Verifica se o plano pertence à localidade desejada
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


    return {
      data: responseData
    }

  }
}
