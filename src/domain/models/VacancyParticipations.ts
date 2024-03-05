interface VacancyParticipationsProps {
  idVacancy: string;
  idCurriculum: string;
}

export class VacancyParticipations {
  constructor(private props: VacancyParticipationsProps) {}

  public get idVacancy(): string {
    return this.props.idVacancy;
  }

  public set idVacancy(id: string) {
    this.props.idVacancy = id;
  }

  public get idCurriculum(): string {
    return this.props.idCurriculum;
  }

  public set idCurriculum(id: string) {
    this.props.idCurriculum = id;
  }
}
