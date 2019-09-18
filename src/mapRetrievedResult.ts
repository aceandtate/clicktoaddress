import { RetrieveResponseResult, RetrieveArgs } from './types';

const identity = (value: any) => value;

interface CountryMappers {
  [countryCode: string]: (result: RetrieveResponseResult) => RetrieveResponseResult;
}

const isNumeric = (str: string) => !isNaN(parseFloat(str));

const countryMappers: CountryMappers = {
  ES(result: RetrieveResponseResult) {
    if (isNumeric(result.building_name) && !result.building_number) {
      return {
        ...result,
        building_name: '',
        building_number: result.building_name,
      }
    }
    return result;
  }
} as const;


export default function mapRetrievedResult(args: RetrieveArgs, result: RetrieveResponseResult) {
  const countryCode = args.country as keyof typeof countryMappers;
  const mapper = countryMappers[countryCode];
  return mapper ? mapper(result) : result;
}
