# clicktoaddress

A clicktoaddress client

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
