import { PlainsLocationsRepository } from '@app/repositories/PlainsLocationsRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  idLocations: string;
}

@Injectable()
export class DeleteByLocations_PlainsLocations {
  constructor(private repository: PlainsLocationsRepository) {}

  async execute(request: Request): Promise<void> {


   await this.repository.deleteAllByLocation(request.idLocations);

    
  }
}
