import { PlainsLocations } from '@app/models/PlainsLocations';
import { PlainsLocationsRepository } from '@app/repositories/PlainsLocationsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idPlains: string;
  idLocations: string;
}

interface Response {
  data: PlainsLocations[];
}

@Injectable()
export class Update_PlainsLocations {
  constructor(private repository: PlainsLocationsRepository) {}

  async execute(request: Request[]): Promise<Response> {


    await this.repository.deleteAllByLocation(request[0].idLocations);
    
    const data = request.map(
      (req) =>
        new PlainsLocations({
          idPlains: req.idPlains,
          idLocations: req.idLocations,
        }),
    );

    await this.repository.createMany(data);

    return { data };
  }
}
