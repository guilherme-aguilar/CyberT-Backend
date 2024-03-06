import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idPlains: string;
  idBenefits: string;
}

interface Response {
  data: PlainsBenefits;
}

@Injectable()
export class Create_PlainsBenefits{
  constructor(private repository: PlainsBenefitsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { idBenefits, idPlains } = request;

    const data = new PlainsBenefits({
      idBenefits, idPlains,
    });

    await this.repository.create(data);

    return { data };
  }
}
