import createClient from ".";

const fetchWithMock = (response: object = {}) =>
  jest.fn().mockResolvedValue({ json: () => response });

const clientWithMock = (options?: object, response?: any) =>
  createClient({
    key: "some key",
    fetch: fetchWithMock(response),
    ...options
  });

describe("createClient", () => {
  it("should return a set of functions", () => {
    const { get, countries, find, retrieve } = clientWithMock();
    expect(get).toBeInstanceOf(Function);
    expect(countries).toBeInstanceOf(Function);
    expect(find).toBeInstanceOf(Function);
    expect(retrieve).toBeInstanceOf(Function);
  });

  it("should call the passed fetch", async () => {
    const fetch = fetchWithMock();
    const { get } = clientWithMock({ fetch });
    const response = await get("something", { my: "arg" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.craftyclicks.co.uk/address/1.1/something",
      {
        body: '{"my":"arg","key":"some key"}',
        mode: "cors",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST"
      }
    );
  });

  it("should reject with the result of the API error, if available", async () => {
    const { get } = clientWithMock(null, {
      error: { message: "error message" }
    });
    await expect(get("something", {})).rejects.toMatch("error message");
  });
});
