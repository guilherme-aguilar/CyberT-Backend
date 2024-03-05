
import { BandwidthProfile } from '@app/models/BandwidthProfile';
import { BandwidthProfileRepository } from '@app/repositories/bandwidthProfileRepository';

import { Injectable } from '@nestjs/common';
import { BandwidthProfileNotFound } from './errors/not-found';

interface Request {
  id : string;
}

interface Response {
  data: BandwidthProfile[];
}

@Injectable()
export class Disable_BandwidthProfile {
  constructor(private repository: BandwidthProfileRepository) {}

  async execute(
    request: Request,
  ): Promise<void> {
   
    const { id } = request;

    const data = await this.repository.getById(id);

    if (!data) {throw new BandwidthProfileNotFound}

    data.disabled();

    console.log(data)

    await this.repository.update(data);
    
  }
}
