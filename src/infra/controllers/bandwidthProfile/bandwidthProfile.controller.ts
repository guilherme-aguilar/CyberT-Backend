import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { BandwidthProfilePresenter } from './bandwidthProfile.presenter';
import { addBandwidthProfileDto, searchBandwidthProfileDto } from './bandwidthProfile.dto';
import { Create_BandwidthProfile } from '@useCases/bandwidth-profile/new.usecases';
import { Get_BandwidthProfile } from '@useCases/bandwidth-profile/search.usecases';
import { Disable_BandwidthProfile } from '@useCases/bandwidth-profile/disabled.usecases';

@Controller('bandwidthProfile')
@ApiTags('bandwidthProfile')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(BandwidthProfilePresenter)

export class BandwidthProfileController {
  constructor(

    //New BandWidthProfile
    @Inject(UsecasesProxyModule.NEW_BANDWIDTH_PROFILE_USECASES_PROXY)
    private readonly NewBandwidthProfileUseCasesProxy: UseCaseProxy<Create_BandwidthProfile>,

    //Get BandWidthProfile
    @Inject(UsecasesProxyModule.SEARCH_BANDWIDTH_PROFILE_USECASES_PROXY)
    private readonly SearchBandwidthProfileUseCasesProxy: UseCaseProxy<Get_BandwidthProfile>,

    //Disabled BandWidthProfile
    @Inject(UsecasesProxyModule.DISABLE_BANDWIDTH_PROFILE_USECASES_PROXY)
    private readonly DisableBandwidthProfileUseCasesProxy: UseCaseProxy<Disable_BandwidthProfile>,

  ) {}

  @Post('')
  @ApiResponseType(BandwidthProfilePresenter, true)
  async New(@Body() dto: addBandwidthProfileDto) {

    const ReceivedUseCase = await this.NewBandwidthProfileUseCasesProxy.getInstance().execute(dto);

    return new BandwidthProfilePresenter(ReceivedUseCase.data);
  }

  @Get('')
  @ApiResponseType(BandwidthProfilePresenter, true)
  async Search(@Query() dto: searchBandwidthProfileDto) {

    const ReceivedUseCase = await this.SearchBandwidthProfileUseCasesProxy.getInstance().execute(dto);

    return ReceivedUseCase.data.map(item => new BandwidthProfilePresenter(item));
  }

  @Patch('disable/:id') // Defina a rota com um parâmetro chamado 'id'
  async disable(@Param('id') id: string) {

    const dto = {
      id: id, // Use o 'id' obtido dos parâmetros
    };

    await this.DisableBandwidthProfileUseCasesProxy.getInstance().execute(dto);;
  }

}
