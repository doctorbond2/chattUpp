import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, disconnect } from "mongoose";

export default async function () {
  // Create a new instance of the MongoMemoryServer
  const instance = await MongoMemoryServer.create();

  // get a URI not connected to the a established database
  const mongoUri = instance.getUri();

  // Save the instance for global access
  global.__MONGO_INSTANCE__ = instance;

  // Set the environment variable to use the in-memory database
  process.env["DATABASE_PATH"] = mongoUri;

  // Connect to the in-memory database
  const conn_ = await connect(mongoUri);

  // Drop the database before running tests
  await conn_.connection.db.dropDatabase();

  // Disconnect from the in-memory database
  await disconnect();
}
