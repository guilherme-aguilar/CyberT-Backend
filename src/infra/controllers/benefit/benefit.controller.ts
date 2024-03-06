import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { BenefitPresenter } from './benefit.presenter';
import { addBenefitDto } from './benefit.dto';
import { Create_Benefits } from '@useCases/benefits/create.usecases';
import { Get_Benefits } from '@useCases/benefits/search.usecases';



@Controller('benefits')
@ApiTags('benefits')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(BenefitPresenter)

export class BenefitController {
  constructor(

    //New BandWidthProfile
    @Inject(UsecasesProxyModule.NEW_BENEFITS_USECASES_PROXY)
    private readonly NewBenefitUseCasesProxy: UseCaseProxy<Create_Benefits>,

    //Get BandWidthProfile
    @Inject(UsecasesProxyModule.SEARCH_BENEFITS_USECASES_PROXY)
    private readonly SearchBenefitUseCasesProxy: UseCaseProxy<Get_Benefits>,


  ) {}

  @Post('')
  @ApiResponseType(BenefitPresenter, true)
  async New(@Body() dto: addBenefitDto) {

    const ReceivedUseCase = await this.NewBenefitUseCasesProxy.getInstance().execute(dto);

    return new BenefitPresenter(ReceivedUseCase.data);
  }

  @Get('')
  @ApiResponseType(BenefitPresenter, true)
  async Search() {

    const ReceivedUseCase = await this.SearchBenefitUseCasesProxy.getInstance().execute();

    return ReceivedUseCase.data.map(item => new BenefitPresenter(item));
  }


}
