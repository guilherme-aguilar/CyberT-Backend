import { Injectable } from '@nestjs/common';
import {
  IBrasilApiService,
  IJwtServiceReturn,
} from '@app/adapters/brasil-api.interface';
import { HttpService } from '@nestjs/axios';

import cepPromise from 'cep-promise'

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
  constructor(
    private readonly httpService: HttpService,
  ) {}

  private async fetchData(AwaitData: string): Promise<DataFetch> {
    //Caso API apresente problemas na solictacao usar o sufixo "?test" na requisicao
    const urlRequest =
      'https://brasilapi.com.br/api/cep/v1/' 
      + AwaitData 
      + '?teste'

    console.log(urlRequest);
    const response = await this.httpService.get(urlRequest).toPromise();

    return response.data;
  }

  private async  getLocationByCepPromise(AwaitData: string): Promise<any> {
    try {
      const { cep: zip_code, city, state, neighborhood, service, street } = await cepPromise(AwaitData);
      return { zip_code, city, state, neighborhood, service, street };
    } catch (error) {
      console.error('Erro ao obter informações do CEP:', error.message);
      // Trate o erro conforme necessário
      return null;
    }
  }


  async search(cep: string): Promise<IJwtServiceReturn> {
    console.log(' buscando cep na base do correios', cep);


    const cleanCep = cep.replace(/-/g, '');

    const {
      cep: zip_code,
      city,
      state,
      neighborhood,
      street,
    }: DataFetch = await this.fetchData(cleanCep);

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
