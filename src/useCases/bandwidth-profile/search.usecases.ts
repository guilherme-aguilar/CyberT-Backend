import { BandwidthProfile } from '@app/models/BandwidthProfile';
import { BandwidthProfileRepository } from '@app/repositories/bandwidthProfileRepository';

import { Injectable } from '@nestjs/common';

interface Request {
  isActive : boolean;
}

interface Response {
  data: BandwidthProfile[];
}

@Injectable()
export class Get_BandwidthProfile {
  constructor(private repository: BandwidthProfileRepository) {}

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
