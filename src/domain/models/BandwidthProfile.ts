import { randomUUID } from 'node:crypto';

interface BandwidthProfileProps {
  description: string;
  uploadBandwidth: string;
  downloadBandwidth: string;
  disabled_at?: Date
}

export class BandwidthProfile {
  private _id: string;
  private props: BandwidthProfileProps;

  constructor(props: BandwidthProfileProps, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public get uploadBandwidth(): string {
    return this.props.uploadBandwidth;
  }

  public set uploadBandwidth(value: string) {
    this.props.uploadBandwidth = value;
  }

  public get downloadBandwidth(): string {
    return this.props.downloadBandwidth;
  }

  public set downloadBandwidth(value: string) {
    this.props.downloadBandwidth = value;
  }
  public get disabled_at(): Date | null | undefined{
    return this.props.disabled_at;
  }
  public disabled() {
    this.props.disabled_at = new Date();
  }
}
