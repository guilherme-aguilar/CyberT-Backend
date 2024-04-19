import { BasicConfiguraction } from '@app/models/basicConfig';
import { BasicConfigRepository } from '@app/repositories/basicConfigRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  urlCentralCliente: string;
  urlSpeedTest: string;
  urlMinhaConexao: string;

  urlFacebook: string;
  urlInstagram: string;
  urlWhatsapp: string;

  emailAtendimento: string;
  emailComercial: string;

  telefonePrincipal: string;

  urlLocalizacao: string;
}

interface Response {
  data: BasicConfiguraction;
}

@Injectable()
export class Update_BasicConfig {
  constructor(private readonly BasicConfigRepository: BasicConfigRepository) {}

  async execute(request: Request): Promise<Response> {
    const UpdatedData = {
      ...request,
    };

    console.log(request);

    const oldData = await this.BasicConfigRepository.search();

    Object.assign(oldData, UpdatedData);

    console.log(oldData);

    await this.BasicConfigRepository.update(oldData);

    return {
      data: oldData,
    };
  }
}
