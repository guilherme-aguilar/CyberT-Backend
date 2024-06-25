import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param, Put
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlainLocationByPlainPresenter, PlainLocationPresenter } from './PlainLocation.presenter';
import { addPlainLocationDto } from './PlainLocation.dto';
import { Update_PlainsLocations } from '@useCases/plain-location/UpdatePlainsByLocation.usecases';
import { Get_PlainsLocationsByLocations } from '@useCases/plain-location/searchByLocation.usecases';
import { UsecasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { ApiResponseType } from '@infra/common/swagger/response.decorator';
import { DeleteByLocations_PlainsLocations } from '@useCases/plain-location/clearPlainsByLocation.usecases';


@Controller('PlainLocation')
@ApiTags('PlainLocation')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PlainLocationPresenter)
export class PlainLocationController {
  constructor(
   

    //Get by Plain
    @Inject(UsecasesProxyModule.SEARCH_PLAIN_LOCATION_BY_LOCATION_PROXY)
    private readonly searchByLocation: UseCaseProxy<Get_PlainsLocationsByLocations>,

    //Update 
    @Inject(UsecasesProxyModule.UPDATE_PLAIN_LOCATION_PROXY)
    private readonly updateMany: UseCaseProxy<Update_PlainsLocations>,

    //DELETE 
    @Inject(UsecasesProxyModule.DELETE_ALL_PLAIN_BY_LOCATION_PROXY)
    private readonly deleteAllPlains: UseCaseProxy<DeleteByLocations_PlainsLocations>,
  ) {}

  // @Post('')
  // @ApiResponseType(PlainLocationPresenter, true)
  // async New(@Body() dto: addPlainBeneiftDto) {
  //   const ReceivedUseCase = await this.create.getInstance().execute(dto);

  //   return new PlainLocationPresenter(ReceivedUseCase.data);
  // }

  @Get('/byLocation/:id') // Defina a rota com um parâmetro chamado 'id'
  @ApiResponseType(PlainLocationByPlainPresenter, true)
  async getByPlain(@Param('id') idLocations: string) {

    const awaitBody = {
      idLocations : idLocations
    }

    const {data} = await this.searchByLocation.getInstance().execute(awaitBody);

    return data.map((item) => new PlainLocationByPlainPresenter(item));

  }

  @Put()
  @ApiResponseType(PlainLocationPresenter, true)
  async update(@Body() body: addPlainLocationDto[]) {

    console.log("body received: ", body)
    
    const { data } = await this.updateMany.getInstance().execute(body);

    return data.map((item) => new PlainLocationPresenter(item));
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {
    
    await this.deleteAllPlains.getInstance().execute({idLocations : id});

  }
}
