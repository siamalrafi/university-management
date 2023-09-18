import mongoose from 'mongoose';
import config from './config/index';
import { Server } from 'http';
import app from './app';
import { logger, errorLogger } from './shared/logger';

process.on('uncaught exception', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database is connected successfully');
    server = app.listen(config.port, () => {
      logger.info(`app is listening in the ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection is detected we are closing our server.....',
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
