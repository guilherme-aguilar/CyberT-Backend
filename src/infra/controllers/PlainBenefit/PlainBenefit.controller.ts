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


import { Create_Plain } from '@useCases/plain/create.usecases';
import { Get_Plain } from '@useCases/plain/search.usecases';
import { Update_Plain } from '@useCases/plain/update.usecases';
import { Disable_Plain } from '@useCases/plain/disable.usecases';
import { PlainBenefitByPlainPresenter, PlainBenefitPresenter } from './PlainBenefit.presenter';
import { addPlainBeneiftDto } from './PlainBenefit.dto';
import { Create_PlainsBenefits } from '@useCases/plain-benefit/create.usecases';
import { SearchByPlain_PlainsBenefits } from '@useCases/plain-benefit/searchByPlain.usecases';
import { Update_PlainsBenefits } from '@useCases/plain-benefit/update.usecases';
import { ClearBenefitsByPlain_PlainsBenefits } from '@useCases/plain-benefit/ClearBenefitsByPlain.usecases';


@Controller('PlainBenefit')
@ApiTags('PlainBenefit')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PlainBenefitPresenter)
export class PlainBenefitController {
  constructor(
    //New 
    @Inject(UsecasesProxyModule.NEW_PLAIN_BENEFIT_PROXY)
    private readonly create: UseCaseProxy<Create_PlainsBenefits>,

    //Get by Plain
    @Inject(UsecasesProxyModule.SEARCH_PLAIN_BENEFIT_BY_PLAIN_PROXY)
    private readonly searchByPlain: UseCaseProxy<SearchByPlain_PlainsBenefits>,

    //Update 
    @Inject(UsecasesProxyModule.UPDATE_PLAIN_BENEFIT_PROXY)
    private readonly updateMany: UseCaseProxy<Update_PlainsBenefits>,

    //DELETE 
    @Inject(UsecasesProxyModule.DISABLE_PLAIN_PROXY)
    private readonly DeleteAllBenefits: UseCaseProxy<ClearBenefitsByPlain_PlainsBenefits>,
  ) {}

  @Post('')
  @ApiResponseType(PlainBenefitPresenter, true)
  async New(@Body() dto: addPlainBeneiftDto) {
    const ReceivedUseCase = await this.create.getInstance().execute(dto);

    return new PlainBenefitPresenter(ReceivedUseCase.data);
  }

  @Get('/byPlain/:id') // Defina a rota com um parâmetro chamado 'id'
  @ApiResponseType(PlainBenefitByPlainPresenter, true)
  async getByPlain(@Param('id') idPlains: string) {

    const awaitBody = {
      idPlains : idPlains
    }

    const {data} = await this.searchByPlain.getInstance().execute(awaitBody);

    return data.map((item) => new PlainBenefitByPlainPresenter(item));

  }

  @Put()
  async update(@Body() body: addPlainBeneiftDto[]) {
    
    const { data } = await this.updateMany.getInstance().execute(body);

    return data.map((item) => new PlainBenefitPresenter(item));
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {
    
    await this.DeleteAllBenefits.getInstance().execute({idPlains : id});

  }
}
