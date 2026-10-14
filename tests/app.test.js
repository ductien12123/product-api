const request = require("supertest");
const app = require("../server");

describe("Test các route cơ bản của ứng dụng", () => {
  it("GET /health phải trả về status 200 và OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });

  it("GET / phải trả về status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product API is running");
  });
  test("xi/cd test", () => {
    expect(1 + 1).toBe(2);
  });
});
