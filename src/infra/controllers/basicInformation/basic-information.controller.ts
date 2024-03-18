import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { Update_BasicConfig } from '@useCases/basic-config/update.usecases';
import { Search_BasicConfig } from '@useCases/basic-config/search.usecases';
import { BasicConfigurationPresenter } from './basic-information.presenter';
import { updateBasicConfiguration } from './basic-information.dto';
import { IsPublic } from '@infra/common/decorators/is-public.decorator';

@Controller('BasicInformation')
@ApiTags('BasicInformation')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(BasicConfigurationPresenter)
export class BasicInformationController {
  constructor(
    //New BandWidthProfile
    @Inject(UsecasesProxyModule.SEARCH_BASIC_CONFIGURATION_PROXY)
    private readonly _search: UseCaseProxy<Search_BasicConfig>,

    //Get BandWidthProfile
    @Inject(UsecasesProxyModule.UPDATE_BASIC_CONFIGURATION_PROXY)
    private readonly _update: UseCaseProxy<Update_BasicConfig>,
  ) {}

  @Get('')
  @IsPublic()
  @ApiResponseType(BasicConfigurationPresenter, true)
  async Search() {
    const ReceivedUseCase = await this._search.getInstance().execute();

    return new BasicConfigurationPresenter(ReceivedUseCase.data);
  }

  @Put()
  @ApiResponseType(BasicConfigurationPresenter, true)
  async Update(@Body() dto: updateBasicConfiguration) {
    const ReceivedUseCase = await this._update.getInstance().execute(dto);

    return new BasicConfigurationPresenter(ReceivedUseCase.data);
  }
}
