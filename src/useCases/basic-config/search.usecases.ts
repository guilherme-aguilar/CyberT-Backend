import { BasicConfiguraction } from "@app/models/basicConfig";
import { BasicConfigRepository } from "@app/repositories/basicConfigRepository";
import { Injectable } from "@nestjs/common";

interface Request {
  
}

interface Response {
  data : BasicConfiguraction
}

@Injectable()

export class Search_BasicConfig {
  constructor(
    private readonly BasicConfigRepository: BasicConfigRepository
  ) {}

  async execute() : Promise<Response> {
  
    console.log("Cheguei dentro do useCase")

    
    const data = await this.BasicConfigRepository.search()

    console.log(data)

    return {
      data:  data
    }

  }
}