import { Injectable } from '@nestjs/common';
import {
  IBrasilApiService,
  IJwtServiceReturn,
} from '@app/adapters/brasil-api.interface';
import { HttpService } from '@nestjs/axios';

interface DataFetch {
  city: string;
  cep: string;
  state: string;
  neighborhood?: string;
  street?: string;
  location?: any;
}

@Injectable()
export class BrasilApiService implements IBrasilApiService {
  constructor(private readonly httpService: HttpService) {}

  private async fetchData(AwaitData: string): Promise<DataFetch> {
    //Caso API apresente problemas na solictacao usar o sufixo "?test" na requisicao
    const urlRequest =
      'https://brasilapi.com.br/api/cep/v2/' + AwaitData + '?test';

    const response = await this.httpService.get(urlRequest).toPromise();

    return response.data;
  }

  async search(cep: string): Promise<IJwtServiceReturn> {
    console.log(' buscando cep na base do correios', cep);
    const {
      cep: zip_code,
      city,
      state,
      neighborhood,
      street,
    }: DataFetch = await this.fetchData(cep);

    const data = {
      city,
      state,
      zip_code,
      neighborhood,
      street,
    };

    return data;
  }
}
