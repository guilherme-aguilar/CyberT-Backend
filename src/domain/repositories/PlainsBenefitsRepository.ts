import { PlainsBenefits } from "@app/models/PlainsBenefits";



export abstract class PlainsBenefitsRepository {

  abstract create(data : PlainsBenefits) : Promise<void>

  abstract createMany(data : PlainsBenefits[]) : Promise<void>

  abstract deleteAllByPlain(id : string) : Promise<void>

  abstract deleteAllByBenefit(id : string) : Promise<void>

  // abstract update(data : City) : Promise<void>

  abstract getByPlain(id : string) : Promise<PlainsBenefits[]>

  abstract get(isActive ?: boolean) : Promise<PlainsBenefits[]>

  //abstract countByCep (zip_code : string) : Promise<number>;

  abstract getByBenefit(idBenefit: string) : Promise<PlainsBenefits[]>
}