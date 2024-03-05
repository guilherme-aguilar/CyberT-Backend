import { Benefit } from '@app/models/benefit';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { Injectable } from '@nestjs/common';

interface CreateSelectProcessRequest {
  name: string;
}

interface Response {
  data: Benefit;
}

@Injectable()
export class Create_Benefits {
  constructor(private repository: benefitsRepository) {}

  async execute(request: CreateSelectProcessRequest): Promise<Response> {
    const { name } = request;

    const data = new Benefit({
      name,
    });

    await this.repository.create(data);

    return { data };
  }
}
