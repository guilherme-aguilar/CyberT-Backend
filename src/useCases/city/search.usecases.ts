
import { City } from '@app/models/city';
import { CityRepository } from '@app/repositories/cityRepository';
import { Injectable } from '@nestjs/common';

interface Response {
  data: City[]
}


interface Request {
  isActive ?: boolean;
}


@Injectable()
export class Get_City {
  constructor(private repository: CityRepository) {}

  async execute(request?: Request): Promise<Response> {

    const isActive = request?.isActive; // Use optional chaining to handle undefined


    if (isActive === true || isActive === false){

      const data = await this.repository.get(request.isActive);
    
      return {
        data
      }

    }
    const data = await this.repository.get();

    return {
      data
    }

  }
}
