import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idPlains: string;
  idBenefits: string;
}

interface Response {
  data: PlainsBenefits[];
}

@Injectable()
export class Update_PlainsBenefits {
  constructor(private repository: PlainsBenefitsRepository) {}

  async execute(request: Request[]): Promise<Response> {


    await this.repository.deleteAllByPlain(request[0].idPlains);
    
    const data = request.map(
      (req) =>
        new PlainsBenefits({
          idPlains: req.idPlains,
          idBenefits: req.idBenefits,
        }),
    );

    await this.repository.createMany(data);

    return { data };
  }
}
