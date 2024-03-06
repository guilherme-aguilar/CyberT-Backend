import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';

import { addCityDto, updateCityDto } from './city.dto';
import { CityPresenter } from './city.presenter';
import { Create_City } from '@useCases/city/create.usecases';
import { Get_City } from '@useCases/city/search.usecases';
import { Update_City } from '@useCases/city/update.usecases';

@Controller('City')
@ApiTags('City')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CityPresenter)
export class CityController {
  constructor(
    //New BandWidthProfile
    @Inject(UsecasesProxyModule.NEW_CITY_PROXY)
    private readonly create: UseCaseProxy<Create_City>,

    //Get BandWidthProfile
    @Inject(UsecasesProxyModule.SEARCH_CITY_PROXY)
    private readonly search: UseCaseProxy<Get_City>,

    //Get BandWidthProfile
    @Inject(UsecasesProxyModule.UPDATE_CITY_PROXY)
    private readonly update: UseCaseProxy<Update_City>,
  ) {}

  @Post('')
  @ApiResponseType(CityPresenter, true)
  async New(@Body() dto: addCityDto) {
    const ReceivedUseCase = await this.create.getInstance().execute(dto);

    return new CityPresenter(ReceivedUseCase.data);
  }

  @Get('')
  @ApiResponseType(CityPresenter, true)
  async Search() {
    const ReceivedUseCase = await this.search.getInstance().execute();

    return ReceivedUseCase.data.map((item) => new CityPresenter(item));
  }

  @Put('/:id')
  async Update(@Param('id') id: string, @Body() body: updateCityDto) {
    const { idShop } = body;

    const awaitBody = {
      id: id, // Use o 'id' obtido dos parâmetros
      idShop,
    };

    const { data } = await this.update.getInstance().execute(awaitBody);

    return new CityPresenter(data);
  }
}
