import { Plain } from '@app/models/plains';
import { plainRepository } from '@app/repositories/plainRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  isActive: boolean
}

interface Response {
  data: Plain[];
}

@Injectable()
export class Get_Plain {
  constructor(private repository: plainRepository) {}

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
