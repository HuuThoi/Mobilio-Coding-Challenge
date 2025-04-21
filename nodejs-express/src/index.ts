import Logger from './utils/Logger';
import { port } from './config';
import app from './app';

try {
  app
    .listen(port, () => {
      console.log(`server running on port : ${port}`);
      Logger.info(`Logger: server running on port : ${port}`);
    })
    .on('error', e => Logger.error(e));
} catch (error) {
  console.log(error);
}
