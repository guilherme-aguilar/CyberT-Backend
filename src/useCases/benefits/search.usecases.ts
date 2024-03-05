import { Benefit } from '@app/models/benefit';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  isActive?: boolean;
}

interface Response {
  data: Benefit[];
}

@Injectable()
export class Get_Benefits {
  constructor(private repository: benefitsRepository) {}

  async execute(request?: Request): Promise<Response> {
    const isActive = request?.isActive; // Use optional chaining to handle undefined

    if (isActive === true || isActive === false) {
      const data = await this.repository.get(request.isActive);

      return {
        data,
      };
    }
    const data = await this.repository.get();

    return {
      data,
    };
  }
}
