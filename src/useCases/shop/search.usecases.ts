import { Shop } from '@app/models/shop';
import { ShopRepository } from '@app/repositories/shopRepository';
import { Injectable } from '@nestjs/common';

interface Response {
  data: Shop[]
}
interface Request {
  isActive ?: boolean;
}

@Injectable()
export class Get_Shop {
  constructor(private repository: ShopRepository) {}

  async execute(request: Request): Promise<Response> {

    const isActive = request?.isActive; // Use optional chaining to handle undefined

    if (isActive === true || isActive === false){

      const data = await this.repository.get(request.isActive);
    
      console.log(data)
      return {
        data
      }

    }

    const data = await this.repository.get();
    
    console.log(data)
    
    return {
      data
    }

  }
}
