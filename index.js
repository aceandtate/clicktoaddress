import fetch from "isomorphic-fetch";

const API_ENDPOINT = "https://api.craftyclicks.co.uk/address/1.1/";
const defaultOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
};

export default function createClient({
  key,
  endpoint = API_ENDPOINT,
  fetch = global.fetch,
  options = defaultOptions
}) {
  const api = async (path, args) => {
    const url = `${endpoint}${path}`;
    const requestOptions = {
      ...options,
      body: JSON.stringify({ key, ...args })
    };
    const response = await fetch(url, requestOptions);
    return response.json();
  };

  return Object.assign(api, {
    countries: args =>
      api("countries", args).then(data =>
        data.countries.map(country => ({
          ...country,
          get: query => api.find({ country: country.code, query })
        }))
      ),
    find: args =>
      api("find", args).then(data =>
        data.results.map(result => ({
          ...result,
          get: () => api.retrieve({ country: args.country, id: result.id })
        }))
      ),
    retrieve: args => api("retrieve", args).then(data => data.result)
  });
}
