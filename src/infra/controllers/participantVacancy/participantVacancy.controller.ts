import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UsecasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { FindAll_Vacancy } from '@useCases/vacancy/findAll.usecases';
import { Find_Vacancy } from '@useCases/vacancy/find.usecases';
import { Finish_Vacancy } from '@useCases/vacancy/finish.usecases';
import { Create_Vacancy } from '@useCases/vacancy/create.usecases';
import { IsPublic } from '@infra/common/decorators/is-public.decorator';
import { Create_ParticipantVacancy } from '@useCases/participant-vacancy/create.usecases';
import { Findall_ParticipantVacancy } from '@useCases/participant-vacancy/findAll.usecases';
import { FindById_ParticipantVacancy } from '@useCases/participant-vacancy/findById.usecases';
import { FindByVacancy_ParticipantVacancy } from '@useCases/participant-vacancy/findByVacancy.usecases';
import { addParticipantVacancyDto } from './participantVacancy.dto';
import { PartipantVacancyPresenter } from './participantVacancy.presenter';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('ParticipantVacancy')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PartipantVacancyPresenter)
@Controller('ParticipantVacancy')
export class ParticipantVacancyController {
  constructor(
    //Create
    @Inject(UsecasesProxyModule.NEW_PARTICIPANT_VACANCY_PROXY)
    private readonly _create: UseCaseProxy<Create_ParticipantVacancy>,

    //Find all
    @Inject(UsecasesProxyModule.FIND_ALL_PARTICIPANT_VACANCY_PROXY)
    private readonly _findAll: UseCaseProxy<Findall_ParticipantVacancy>,

    //Find by Id
    @Inject(UsecasesProxyModule.FIND_BY_ID_PARTICIPANT_VACANCY_PROXY)
    private readonly _findbyid: UseCaseProxy<FindById_ParticipantVacancy>,

    //Find by Vacancy
    @Inject(UsecasesProxyModule.FIND_BY_VACANCY_PARTICIPANT_VACANCY_PROXY)
    private readonly _findByVacancy: UseCaseProxy<FindByVacancy_ParticipantVacancy>,
  ) {}

  @Post()
  async addVacancy(
    @Body() dto: addParticipantVacancyDto,
  ): Promise<PartipantVacancyPresenter> {
    const vacancy = await this._create.getInstance().execute(dto);

    return new PartipantVacancyPresenter(vacancy.data);
  }

  @IsPublic()
  @Get()
  async findAll(): Promise<PartipantVacancyPresenter[]> {
    const vacancies = await this._findAll.getInstance().execute();

    return vacancies.data.map((vacancy) => new PartipantVacancyPresenter(vacancy));
  }

  @Get('/byid/:id')
  async findOne(@Param('id') id: string): Promise<PartipantVacancyPresenter> {
    const vacancy = await this._findbyid.getInstance().execute({ id });

    return new PartipantVacancyPresenter(vacancy.data);
  }

  @Get('/byVacancy/:id')
  async findByVacancy(@Param('id') id: string): Promise<PartipantVacancyPresenter> {
    const vacancy = await this._findbyid.getInstance().execute({ id });

    return new PartipantVacancyPresenter(vacancy.data);
  }
}
