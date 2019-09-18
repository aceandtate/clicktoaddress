import * as isomorphicFetch from "isomorphic-fetch";
import mapRetrievedResult from "./mapRetrievedResult";

import {
  ClientOptions,
  CountriesArgs,
  CountriesResponse,
  FindArgs,
  FindResponse,
  RetrieveArgs,
  RetrieveResponse
} from './types';

const API_ENDPOINT = "https://api.craftyclicks.co.uk/address/1.1/";
const defaultOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
};

type ApiOptions = CountriesArgs | FindArgs | RetrieveArgs;

export default function createClient({
  key,
  endpoint = API_ENDPOINT,
  fetch = isomorphicFetch,
  options = defaultOptions
}: ClientOptions) {
  const api = async (path: string, args: ApiOptions) => {
    const url = `${endpoint}${path}`;
    const requestOptions = {
      ...options,
      body: JSON.stringify({ ...args, key })
    };

    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (json.error) {
      // Stacktrace not useful in this case,
      //  so we throw an error string
      throw json.error.message || json.error;
    }

    return json;
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
    api("retrieve", args).then((data: RetrieveResponse) => mapRetrievedResult(args, data.result));

  return {
    get: api,
    countries,
    find,
    retrieve
  };
}
