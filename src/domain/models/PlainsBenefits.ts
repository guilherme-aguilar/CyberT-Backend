import { randomUUID } from 'node:crypto';

interface PlainsBenefitsProps {
  idPlains: string;
  idBenefits: string;
}

export class PlainsBenefits {
  constructor(private props: PlainsBenefitsProps) {}

  public get idPlains(): string {
    return this.props.idPlains;
  }

  public set idPlains(value: string) {
     this.props.idPlains = value;
  }

  public get idBenefits(): string {
    return this.props.idBenefits;
  }

  public set idBenefits(value: string) {
    this.props.idBenefits = value;
  }
}
