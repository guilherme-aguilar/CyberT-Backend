import { IBrasilApiService } from '@app/adapters/brasil-api.interface';
import { City } from '@app/models/city';
import { CityRepository } from '@app/repositories/cityRepository';
import { Injectable } from '@nestjs/common';

interface CityRequest {
  zip_code: string;
  idShop?: string;
}

interface CreateCityResponse {
  data: City;
}

@Injectable()
export class Create_City {
  constructor(
    private respositoryLocal: CityRepository,
    private brasilApi: IBrasilApiService
  ) {}

  async execute(req: CityRequest): Promise<CreateCityResponse> {
    const { zip_code : cep, idShop } = req;

    console.log(cep)
    
    const { city, neighborhood, state, street, zip_code  } = await this.brasilApi.search(cep)


    if(!city) {
     throw new Error("Zip code not found")
    }

    const CityByZipCode = await this.respositoryLocal.countByCep(zip_code)

    if(CityByZipCode !== 0) {
      throw new Error("Zip code is already registered")
     }

    const data = new City({
      city,
      neighborhood,
      state,
      street,
      zip_code,
      idShop,
    });

    await this.respositoryLocal.create(data);

    return {
      data,
    };
  }
}
