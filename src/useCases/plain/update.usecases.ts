import { Plain } from '@app/models/plains';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';
import { PlainsNotFound } from './errors/PlainNotFound';

interface Request {
  id: string;
  visibleName?: string;
  internalName?: string;
  price?: string;
  discountPrice?: string;
  idProfileBandwidth?: string;
}

interface Response {
  data: Plain;
}

@Injectable()
export class Update_Plain {
  constructor(private repository: plainRepository) {}

  async execute(request: Request): Promise<Response> {

    const { id, ...DataUpdated  } = request;

    const OldData = await this.repository.getById(id);

    // Validate if oldData not is nullable
    if (!OldData) {
      throw new PlainsNotFound();
    }
    
    //compare data, and update
    Object.assign(OldData, DataUpdated);

    await this.repository.update(OldData);

    return {
      data: OldData,
    };
  }
}
