import { randomUUID } from 'node:crypto';

interface PlainsLocationsProps {
  idPlains: string;
  idLocations: string;
}

export class PlainsLocations {
  constructor(private props: PlainsLocationsProps) {}

  public get idPlains(): string {
    return this.props.idPlains;
  }

  public set idPlains(value: string) {
     this.props.idPlains = value;
  }

  public get idLocations(): string {
    return this.props.idLocations;
  }

  public set idLocations(value: string) {
    this.props.idLocations = value;
  }
}
