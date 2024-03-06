import { Plain } from '@app/models/plains';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  visibleName: string;
  internalName: string;
  price: string;
  discountPrice?: string;
  idProfileBandwidth: string;
}

interface Response {
  data: Plain;
}

@Injectable()
export class Create_Plain {
  constructor(private repository: plainRepository) {}

  async execute(req: Request): Promise<Response> {
    const { visibleName, internalName, price, discountPrice, idProfileBandwidth } = req;

    const data = new Plain({
      visibleName, internalName, price, discountPrice, idProfileBandwidth
    });

    await this.repository.create(data);

    return {
      data,
    };
  }
}
