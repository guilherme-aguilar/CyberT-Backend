
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idPlains: string;
}

interface Response {
  data: {
    isChecked: boolean;
    id: string;
    name: string;
  }[];
}

@Injectable()
export class SearchByPlain_PlainsBenefits {
  constructor(
    private repository: PlainsBenefitsRepository,
    private BenefitsRepository: benefitsRepository
    ) {}

  async execute(request: Request): Promise<Response> {

    const idPlain = request.idPlains; // Use optional chaining to handle undefined

      const dataBenefitsToPlain = await this.repository.getByPlain(idPlain);

      const dataBenefits = await this.BenefitsRepository.get();

      const responseData = dataBenefits.map(benefit => {
        
        const hasPlainBenefit = dataBenefitsToPlain.some(item => item.idPlains && item.idBenefits === benefit.id);
      
        // Certifique-se de que cada objeto tem as propriedades id, name e isChecked
        return {
          id: benefit.id,
          name: benefit.name,
          isChecked: hasPlainBenefit,
        };
      });
  
      return {
        data : responseData,
      };
  }
}
