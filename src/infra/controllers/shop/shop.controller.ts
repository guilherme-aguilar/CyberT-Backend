import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';

import { ShopPresenter } from './shop.presenter';
import { SearchByPlain_PlainsBenefits } from '@useCases/plain-benefit/searchByPlain.usecases';
import { ClearBenefitsByPlain_PlainsBenefits } from '@useCases/plain-benefit/ClearBenefitsByPlain.usecases';
import { Update_PlainsBenefits } from '@useCases/plain-benefit/updateBenefitsByPlain.usecases';
import { DeleteByLocations_PlainsLocations } from '@useCases/plain-location/ClearPlainsByLocation.usecases';
import { Update_PlainsLocations } from '@useCases/plain-location/UpdatePlainsByLocation.usecases';
import { Get_PlainsLocationsByLocations } from '@useCases/plain-location/searchByLocation.usecases';
import { Get_Shop } from '@useCases/shop/search.usecases';
import { Update_Shop } from '@useCases/shop/update.usecases';
import { Disable_Shop } from '@useCases/shop/disable.usecases';
import { Create_Shop } from '@useCases/shop/create.usecases';
import { addShopDto, searchShopDto } from './shop.dto';

@Controller('Shop')
@ApiTags('Shop')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ShopPresenter)
export class ShopController {
  constructor(
    //Get
    @Inject(UsecasesProxyModule.SEARCH_SHOP_PROXY)
    private readonly search: UseCaseProxy<Get_Shop>,

    //Update
    @Inject(UsecasesProxyModule.UPDATE_SHOP_PROXY)
    private readonly update: UseCaseProxy<Update_Shop>,

    //disable
    @Inject(UsecasesProxyModule.DISABLE_SHOP_PROXY)
    private readonly disable: UseCaseProxy<Disable_Shop>,

    //create
    @Inject(UsecasesProxyModule.CREATE_SHOP_PROXY)
    private readonly create: UseCaseProxy<Create_Shop>,
  ) {}

  @Post('')
  @ApiResponseType(ShopPresenter, true)
  async New(@Body() dto: addShopDto) {

    const { data } = await this.create.getInstance().execute(dto);

    return new ShopPresenter(data);
  }

  @Get('') // Defina a rota com um parâmetro chamado 'id'
  @ApiResponseType(ShopPresenter, true)
  async Search(@Query() dto: searchShopDto) {
    let isActive = undefined;

    if (
      dto.isActive !== 'true' &&
      dto.isActive !== 'false' &&
      dto.isActive !== undefined
    ) {
      throw new Error('isActive must be string equal true or false');
    }

    if (typeof dto.isActive === 'string') {
      console.log;
      isActive = JSON.parse(dto.isActive);
    }

    const { data } = await this.search.getInstance().execute({ isActive });

    return data.map((item) => new ShopPresenter(item));
  }

  @Put(':id')
  @ApiResponseType(ShopPresenter, true)
  async Update(@Param('id') id: string, @Body() body: addShopDto) {
    const { data } = await this.update.getInstance().execute({ id, ...body });

    return new ShopPresenter(data);
  }

  @Patch('/disable/:id')
  async delete(@Param('id') id: string) {
    await this.disable.getInstance().execute({ id: id });
  }
}
