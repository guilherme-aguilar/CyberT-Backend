import { PlainsLocationsRepository } from '@app/repositories/PlainsLocationsRepository';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idLocations: string;
}

interface Response {
  data: {
    id: string;
    internalName: string;
    visibleName: string;
    price: string;
    discountPrice: string;
    isChecked: boolean;
  }[];
}

@Injectable()
export class Get_PlainsLocationsByLocations {
  constructor(
    private repository: PlainsLocationsRepository,
    private plainRepository: plainRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const idLocations = request.idLocations; // Use optional chaining to handle undefined

    const dataPlainLocations = await this.repository.getByLocation(idLocations);

    const dataPlains = await this.plainRepository.get(true);

    const responseData = dataPlains.map((dataReceived) => {

      const hasPlainLocation = dataPlainLocations.some(
        (item) => item.idLocations && item.idPlains === dataReceived.id,
      );
      
      // Certifique-se de que cada objeto tem as propriedades id, name e isChecked
      return {
        id: dataReceived.id,
        internalName: dataReceived.internalName,
        visibleName: dataReceived.visibleName,
        price: dataReceived.price,
        discountPrice: dataReceived.discountPrice,
        isChecked: hasPlainLocation,
      };
    });

    console.log(responseData)

    return {
      data: responseData,
    };
  }
}
