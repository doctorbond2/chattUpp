const mongoose = require("mongoose");

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env["DATABASE_PATH"]).then(() => {
    console.log(
      "Connected to the in-memory database",
      process.env["DATABASE_PATH"]
    );
  });
});

afterAll(async () => {
  // put your client disconnection code here, example with mongoose:
  await mongoose.disconnect();
});
