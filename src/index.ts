import * as isomorphicFetch from "isomorphic-fetch";

const API_ENDPOINT = "https://api.craftyclicks.co.uk/address/1.1/";
const defaultOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
};

type Fetch = (url: string, options: object) => Promise<Response>;
interface ClientOptions {
  key: string;
  endpoint?: string;
  fetch?: Fetch;
  options?: object;
}

interface CountriesArgs {
  language?: string;
  ip?: string;
}

interface CountriesResponse {
  countries: Array<{
    code: string;
  }>;
}

interface FindArgs {
  country: string;
  query: string;
}

interface FindResponse {
  results: Array<{
    id: string;
  }>;
}

interface RetrieveArgs {
  country: string;
  id: string;
  lines?: number;
}

interface RetrieveResponse {
  result: {
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
  };
}

export default function createClient({
  key,
  endpoint = API_ENDPOINT,
  fetch = isomorphicFetch,
  options = defaultOptions
}: ClientOptions) {
  const api = async (path: string, args: object) => {
    const url = `${endpoint}${path}`;
    const requestOptions = {
      ...options,
      body: JSON.stringify({ ...args, key })
    };

    const response = await fetch(url, requestOptions);
    return response.json();
  };

  const countries = (args: CountriesArgs) =>
    api("countries", args).then((data: CountriesResponse) =>
      data.countries.map(country => ({
        ...country,
        get: (query: string) => find({ country: country.code, query })
      }))
    );

  const find = (args: FindArgs) =>
    api("find", args).then((data: FindResponse) =>
      data.results.map(result => ({
        ...result,
        get: () => retrieve({ country: args.country, id: result.id })
      }))
    );

  const retrieve = (args: RetrieveArgs) =>
    api("retrieve", args).then((data: RetrieveResponse) => data.result);

  return {
    get: api,
    countries,
    find,
    retrieve
  };
}
