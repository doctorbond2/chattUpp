import User from "../../dist/models/user.model.js";
describe("User model tests", () => {
  afterEach(async function () {
    console.log("YOEY");
  });
  it("should console log", function () {
    const test = "Joey";
    expect(console.log(test).toMatch("Joey"));
  });
});
