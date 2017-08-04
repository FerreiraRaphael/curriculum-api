import request from "supertest-as-promised";
import Api from "../../api";

/**
 * @jest-environment node
 */
const app = new Api().express;

describe("User Routes", () => {
  it("hello test", async () => {
    const res = await request(app).post("/api/users").send({
      name: "test user",
      email: "test_user@gmail.com",
      password: "tests"
    });
    console.log(res.body);
    expect(typeof res.body.message).toBe("string");
    expect(res.body.message).toBe("Hello Flow!");
  });
});
