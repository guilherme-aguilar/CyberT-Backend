import { Benefit } from '@app/models/benefit';
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  id: string;
}

interface Response {
  data: Benefit;
}

@Injectable()
export class Delete_Benefits {
  constructor(
    private repository: benefitsRepository,
    private plainBenefitsRepository: PlainsBenefitsRepository
  ) {}

  async execute(request: Request): Promise<Response> {
    const { id } = request;

    const dataItsDelete = await this.repository.getById(id);

    await this.plainBenefitsRepository.deleteAllByBenefit(dataItsDelete.id)

    await this.repository.delete(dataItsDelete.id)

    return { data : dataItsDelete };
  }
}
