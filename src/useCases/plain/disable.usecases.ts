import { Plain } from '@app/models/plains';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';
import { PlainsNotFound } from './errors/PlainNotFound';

interface Request {
  id: string
}

interface Response {
  data: Plain;
}

@Injectable()
export class Disable_Plain {
  constructor(private repository: plainRepository) {}

  async execute(request?: Request): Promise<Response> {
    const { id } = request;

    const OldData = await this.repository.getById(id);

    // Validate if oldData not is nullable
    if (!OldData) {
      throw new PlainsNotFound();
    }

    OldData.disabled()

    await this.repository.update(OldData);

    return {
      data: OldData,
    };
  }
}
