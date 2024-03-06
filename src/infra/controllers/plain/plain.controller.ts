import {
  Body,
  Controller,
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

import { addPlainDto, searchPlainDto, updatePlainDto } from './plain.dto';
import { PlainByLocationPresenter, PlainPresenter } from './plain.presenter';


import { Create_Plain } from '@useCases/plain/create.usecases';
import { Get_Plain } from '@useCases/plain/search.usecases';
import { Update_Plain } from '@useCases/plain/update.usecases';
import { Disable_Plain } from '@useCases/plain/delete.usecases';
import { GetByLocation_Plain } from '@useCases/plain/searchByLocation.usecases';


@Controller('Plain')
@ApiTags('Plain')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PlainPresenter)
export class PlainController {
  constructor(
    //New 
    @Inject(UsecasesProxyModule.NEW_PLAIN_PROXY)
    private readonly create: UseCaseProxy<Create_Plain>,

    //Get 
    @Inject(UsecasesProxyModule.SEARCH_PLAIN_PROXY)
    private readonly search: UseCaseProxy<Get_Plain>,

    //Get 
    @Inject(UsecasesProxyModule.SEARCH_PLAIN_BY_LOCATION_PROXY)
    private readonly searchByLocation: UseCaseProxy<GetByLocation_Plain>,

    //Update 
    @Inject(UsecasesProxyModule.UPDATE_PLAIN_PROXY)
    private readonly update: UseCaseProxy<Update_Plain>,

    //Disable 
    @Inject(UsecasesProxyModule.DISABLE_PLAIN_PROXY)
    private readonly disable: UseCaseProxy<Disable_Plain>,
  ) {}

  @Post('')
  @ApiResponseType(PlainPresenter, true)
  async New(@Body() dto: addPlainDto) {
    const ReceivedUseCase = await this.create.getInstance().execute(dto);

    return new PlainPresenter(ReceivedUseCase.data);
  }

  @Get('')
  @ApiResponseType(PlainPresenter, true)
  async Search(@Query() dto: searchPlainDto) {

    let isActive = undefined

    if (dto.isActive !== 'true' && dto.isActive !== 'false' && dto.isActive !== undefined) {
      throw new Error('isActive must be string equal true or false');
    }

    if(typeof dto.isActive === "string") {
      console.log
       isActive = JSON.parse(dto.isActive)
    }

    const ReceivedUseCase = await this.search.getInstance().execute({isActive});

    return ReceivedUseCase.data.map((item) => new PlainPresenter(item));
  }

  @Get('/byLocation/:id')
  @ApiResponseType(PlainPresenter, true)
  async SearchByLocation(@Param('id') idLocations: string) {

    const {data} = await this.searchByLocation.getInstance().execute({idLocations});

    return data.map((item) => new PlainByLocationPresenter(item));
  }

  @Put('/:id')
  @ApiResponseType(PlainPresenter, true)
  async Update(@Body() body: updatePlainDto, @Param('id') id: string, ) {


    console.log(body);

    const awaitBody = {
      id: id, // Use o 'id' obtido dos parâmetros
      ...body,
    };

    const { data } = await this.update.getInstance().execute(awaitBody);

    return new PlainPresenter(data);
  }

  @Patch('/disable/:id')
  async Disable(@Param('id') id: string) {

    const { data } = await this.disable.getInstance().execute({
      id
    });

    return new PlainPresenter(data);
  }
}
