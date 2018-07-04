const fetch = require("isomorphic-fetch");

const API_ENDPOINT = "https://api.craftyclicks.co.uk/address/1.1/";
const defaultOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
};

const extend = (...args) => Object.assign({}, ...args);

module.exports = function createClient({
  key,
  endpoint = API_ENDPOINT,
  fetch = global.fetch,
  options = defaultOptions
}) {
  const api = (path, args) => {
    const url = `${endpoint}${path}`;
    const requestOptions = extend(options, {
      body: JSON.stringify(extend(args, { key }))
    });

    return fetch(url, requestOptions).then(res => res.json());
  };

  return Object.assign(api, {
    countries: args =>
      api("countries", args).then(data =>
        data.countries.map(country =>
          extend(country, {
            get: query => api.find({ country: country.code, query })
          })
        )
      ),
    find: args =>
      api("find", args).then(data =>
        data.results.map(result =>
          extend(result, {
            get: () => api.retrieve({ country: args.country, id: result.id })
          })
        )
      ),
    retrieve: args => api("retrieve", args).then(data => data.result)
  });
};
