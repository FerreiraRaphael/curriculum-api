import request from "supertest-as-promised";
import Api from "./api";

const app = new Api().express;

describe("Flow API", () => {
  it("hello test", async () => {
    const res = await request(app).get("/").expect(200);
    expect(typeof res.body.message).toBe("string");
    expect(res.body.message).toBe("Hello Flow!");
  });
});
