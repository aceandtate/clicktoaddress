const createClient = require(".");

describe("createClient", () => {
  it("should return a function", () => {
    const client = createClient({});
    expect(typeof client).toBe("function");
  });
});
