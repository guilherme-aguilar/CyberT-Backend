import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idPlains: string;
}


@Injectable()
export class ClearBenefitsByPlain_PlainsBenefits{
  constructor(private repository: PlainsBenefitsRepository) {}

  async execute(request: Request) {
    
    await this.repository.deleteAllByPlain(request.idPlains);
    
  }
}
