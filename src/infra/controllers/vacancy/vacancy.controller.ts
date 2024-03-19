import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { addVacancyDto } from './vacancy.dto';
import { VacancyPresenter } from './vacancy.presenter';
import { UsecasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { FindAll_Vacancy } from '@useCases/vacancy/findAll.usecases';
import { Find_Vacancy } from '@useCases/vacancy/find.usecases';
import { Finish_Vacancy } from '@useCases/vacancy/finish.usecases';
import { Create_Vacancy } from '@useCases/vacancy/create.usecases';
import { IsPublic } from '@infra/common/decorators/is-public.decorator';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Vacancy')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(VacancyPresenter)
@Controller('Vacancy')
export class VacancyController {
  constructor(
    //Get
    @Inject(UsecasesProxyModule.FIND_ALL_VACANCY_PROXY)
    private readonly _findAll: UseCaseProxy<FindAll_Vacancy>,

    //Update
    @Inject(UsecasesProxyModule.FIND_VACANCY_PROXY)
    private readonly _findbyid: UseCaseProxy<Find_Vacancy>,

    //disable
    @Inject(UsecasesProxyModule.FINISH_VACANCY_PROXY)
    private readonly _disable: UseCaseProxy<Finish_Vacancy>,

    //create
    @Inject(UsecasesProxyModule.CREATE_VACANCY_PROXY)
    private readonly _create: UseCaseProxy<Create_Vacancy>,
  ) {}

  @Post()
  async addVacancy(
    @Body() addVacancyDto: addVacancyDto,
  ): Promise<VacancyPresenter> {
    
    const vacancy = await this._create.getInstance().execute(addVacancyDto);

    return new VacancyPresenter(vacancy.data);
  }

  @Patch('disable/:id')
  async disableVacancy(@Param('id') id: string): Promise<void> {

    const vacancy = await this._disable.getInstance().execute({id});

  }

  @IsPublic()
  @Get()
  async findAll(): Promise<VacancyPresenter[]> {
    const vacancies = await this._findAll.getInstance().execute();

    return vacancies.data.map((vacancy) => new VacancyPresenter(vacancy));
  }

  @IsPublic()
  @Get('/byid/:id')
  async findOne(@Param('id') id: string): Promise<VacancyPresenter> {
    const vacancy = await this._findbyid.getInstance().execute({id});

    return new VacancyPresenter(vacancy.data);
  }
}
