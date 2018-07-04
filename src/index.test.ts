import createClient from ".";
const key = "some key";

describe("createClient", () => {
  it("should return a set of functions", () => {
    const { get, countries, find, retrieve } = createClient({ key });
    expect(get).toBeInstanceOf(Function);
    expect(countries).toBeInstanceOf(Function);
    expect(find).toBeInstanceOf(Function);
    expect(retrieve).toBeInstanceOf(Function);
  });

  it("should call the passed fetch", async () => {
    const fetch = jest.fn().mockResolvedValue({ json: () => "response" });
    const { get } = createClient({ fetch, key });
    const response = await get("something", { my: "arg" });
    expect(response).toBe("response");
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
});
