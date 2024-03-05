import { randomUUID } from 'node:crypto';

interface EducationProps {
  type: string;
  institution: string;
  duration: string;
  completed_on: Date;
  arquive: string;
  curriculum_id: string;
  disabled_at?: Date;
}

export class Education {
  private props: EducationProps;
  private _id: string;

  constructor(props: EducationProps, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
    };
  }
  public get id(): string {
    return this._id;
  }



  public set type(type: string) {
    this.props.type = type;
  }

  public get type(): string {
    return this.props.type;
  }






  public set institution(institution: string) {
    this.props.institution = institution;
  }

  public get institution(): string {
    return this.props.institution;
  }






  public set duration(duration: string) {
    this.props.duration = duration;
  }

  public get duration(): string {
    return this.props.duration;
  }





  public set completed_on(completed_on: Date) {
    this.props.completed_on = completed_on;
  }

  public get completed_on(): Date {
    return this.props.completed_on;
  }






  public set arquive(arquive: string) {
    this.props.arquive = arquive;
  }

  public get arquive(): string {
    return this.props.arquive;
  }

  public set curriculum_id(curriculum_id: string) {
    this.props.arquive = curriculum_id;
  }


  

  public get curriculum_id(): string {
    return this.props.curriculum_id;
  }


  public get disabled_at(): Date | null | undefined{
    return this.props.disabled_at;
  }

  public disabled() {
    this.props.disabled_at = new Date();
  }
}
