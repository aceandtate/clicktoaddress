# clicktoaddress

A clicktoaddress client

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/aceandtate/clicktoaddress/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@aceandtate/clicktoaddress.svg?style=flat)](https://www.npmjs.com/package/@aceandtate/clicktoaddress)
[![Coverage Status](https://codecov.io/gh/aceandtate/clicktoaddress/branch/master/graph/badge.svg?style=flat)](https://codecov.io/gh/aceandtate/clicktoaddress)
[![CircleCI Status](https://circleci.com/gh/aceandtate/clicktoaddress.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/aceandtate/clicktoaddress)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/aceandtate/clicktoaddress/compare)

# Usage

```sh
npm i @aceandtate/clicktoaddress
```

```js
import createClient from '@aceandtate/clicktoaddress';

const { countries, find, retrieve } = createClient({ key: API_KEY });

const allCountries = await countries();
const country = allCountries[0].code;
const results = await find({
  query: '1094 PR 92 A',
  country,
});
const result = await retrieve({ id: results[2].id, country });
// you can check out the shape of the response here:
// https://craftyclicks.co.uk/docs/global/#retrieve
```
