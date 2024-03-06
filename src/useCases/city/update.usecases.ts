import { City } from '@app/models/city';
import { CityRepository } from '@app/repositories/cityRepository';
import { Injectable } from '@nestjs/common';
import { CityNotFound } from './errors/cityNotFound';

interface Response {
  data: City;
}

interface Request {
  id: string;
  idShop?: string;
}

@Injectable()
export class Update_City {
  constructor(private repository: CityRepository) {}

  async execute(request?: Request): Promise<Response> {
    const { id, idShop } = request;

    const DataUpdated = {
      idShop,
    };

    const OldData = await this.repository.getById(id);

    // Validate if oldData not is nullable
    if (!OldData) {
      throw new CityNotFound();
    }

    //compare data, and update
    Object.assign(OldData, DataUpdated);

    await this.repository.update(OldData);

    return {
      data: OldData,
    };
  }
}
