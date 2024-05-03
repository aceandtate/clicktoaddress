export type Fetch = (url: string, options: object) => Promise<Response>;

export interface ClientOptions {
  key: string;
  endpoint?: string;
  fetch?: Fetch;
  options?: object;
}

export interface CountriesArgs {
  language?: string;
  ip?: string;
}

export interface CountriesResponse {
  countries: Array<{
    code: string;
  }>;
}

export interface FindArgs {
  country: string;
  query: string;
}

export interface FindResponse {
  results: Array<{
    id: string;
    count: number;
    labels: Array<string>;
  }>;
}

export interface RetrieveArgs {
  country: string;
  id: string;
  lines?: number;
}

export interface RetrieveResponseResult {
  administrative_area: string;
  alternative_administrative_area: string;
  alternative_locality: string;
  alternative_province: string;
  building_name: string;
  building_number: string;
  company_name: string;
  country_name: string;
  department_name: string;
  dependent_locality: string;
  dependent_street_name: string;
  dependent_street_prefix: string;
  dependent_street_suffix: string;
  double_dependent_locality: string;
  double_dependent_street_name: string;
  double_dependent_street_prefix: string;
  double_dependent_street_suffix: string;
  level_name: string;
  line_1: string;
  line_2: string;
  line_3: string;
  line_4: string;
  line_5: string;
  locality: string;
  post_office_box_number: string;
  post_office_reference_1: string;
  post_office_reference_2: string;
  postal_code: string;
  province: string;
  province_code: string;
  province_name: string;
  street_name: string;
  street_prefix: string;
  street_suffix: string;
  sub_building_name: string;
  unit_name: string;
}

export interface RetrieveResponse {
  result: RetrieveResponseResult;
}
