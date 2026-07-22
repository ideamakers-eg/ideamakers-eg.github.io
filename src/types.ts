export type Country = 'EG' | 'SA' | 'AE';

export interface CountryConfig {
  name: string;
  flag: string;
  currency: string;
  basePackagePrice: number;
  defaultHourlyPrice: number;
  symbol: string;
}

export interface PackageFeature {
  text: string;
  included: boolean;
}
