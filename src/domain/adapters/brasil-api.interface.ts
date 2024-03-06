
export interface IJwtServiceReturn {
  city: string;
  zip_code: string;
  state: string;
  neighborhood?: string;
  street?: string;
  location? : any
}


export interface IBrasilApiService {
  search(cep: string): Promise<IJwtServiceReturn>;
}
