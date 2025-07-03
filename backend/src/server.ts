/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import { config } from './app/config';

let server: Server;
async function main() {
  try {
    mongoose.connect(config.MONGODB_URI as string);
    server = app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
process.on('unhandledRejection', (error) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err); // <-- this logs the error!
});
