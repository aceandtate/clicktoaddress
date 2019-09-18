import { RetrieveArgs, RetrieveResponseResult } from './types';
import mapRetrievedResult from './mapRetrievedResult';

describe('mapRetrievedResult', () => {
  it('should return same result if no mapper is required', () => {
    const responseResult = { building_name: 'BUILDING NAME' } as RetrieveResponseResult;
    const result = mapRetrievedResult(
      { country: 'NL' } as RetrieveArgs,
      responseResult,
    );
    expect(result).toBe(responseResult);
  });

  it('should map Spain address\' building number and name', () => {
    const result = mapRetrievedResult(
      { country: 'ES' } as RetrieveArgs,
      { building_name: '1', building_number: '' } as RetrieveResponseResult,
    );
    expect(result).toEqual({
      building_number: '1',
      building_name: ''
    });
  });

  it('should skip mapping Spain address\' when data seems valid', () => {
    const result = mapRetrievedResult(
      { country: 'ES' } as RetrieveArgs,
      { building_name: 'x', building_number: '1' } as RetrieveResponseResult,
    );
    expect(result).toEqual({
      building_number: '1',
      building_name: 'x'
    });
  });
})
