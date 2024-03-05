import { CEPv2 } from "@app/models/cepv2";


export abstract class CepV2Repository {

  abstract get(zip_code : string) : Promise<CEPv2>

  // abstract update(data : City) : Promise<void>

  // abstract getById(id : string) : Promise<void>

  // abstract get() : Promise<City>
}