const createClient = require(".");

describe("createClient", () => {
  it("should return a function", () => {
    const client = createClient({});
    expect(typeof client).toBe("function");
  });

  it("should call the passed fetch", async () => {
    const fetch = jest.fn().mockResolvedValue({ json: () => "response" });
    const client = createClient({ fetch });
    const response = await client("something", { my: "arg" });
    expect(response).toBe("response");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.craftyclicks.co.uk/address/1.1/something",
      {
        body: '{"my":"arg"}',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        mode: "cors"
      }
    );
  });

  it("should expose the APIs methods", () => {
    const client = createClient({});
    ["countries", "find", "retrieve"].forEach(method => {
      expect(typeof client[method]).toBe("function");
    });
  });
});
