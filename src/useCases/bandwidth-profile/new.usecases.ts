import { BandwidthProfile } from '@app/models/BandwidthProfile';
import { BandwidthProfileRepository } from '@app/repositories/bandwidthProfileRepository';

import { Injectable } from '@nestjs/common';

interface Request {
  uploadBandwidth: string;
  downloadBandwidth: string;
}

interface Response {
  data: BandwidthProfile;
}


export class Create_BandwidthProfile {
  constructor(private readonly repository: BandwidthProfileRepository) {}

  async execute(req: Request): Promise<Response> {
    const {downloadBandwidth, uploadBandwidth } = req;

    const description = `Down=${downloadBandwidth}, Up=${uploadBandwidth}`;

    const data = new BandwidthProfile({
      description, downloadBandwidth, uploadBandwidth 
    });

    await this.repository.create(data);

    return {
      data,
    };
  }
}
