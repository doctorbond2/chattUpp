import mongoose from 'mongoose';
import server from '../server.js';
export const RUN_SERVER = async (db_path: string, port: any) => {
  if (!db_path || !port) {
    throw new Error(
      'PROVIDE ADDITIONAL INPUT TO ESTABLISH CONNECTION WITH DATABASE AND SERVER.'
    );
  }
  try {
    await mongoose.connect(db_path);
    server.listen(port, () => {
      console.log('Connected to host:', port);
    });
    console.log('Connected with mongoose!');
  } catch (err: any) {
    console.log('ERROR CONNECTING WITH MONGOOSE', err.message);
    mongoose.disconnect();
  }
};
