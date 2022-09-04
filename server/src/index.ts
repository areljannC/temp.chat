// EXTERNAL IMPORTS
import 'module-alias/register';
import dotenv from 'dotenv';

// SHARED IMPORTS
import { CONFIG } from '@constants';

// LOCAL IMPORTS
import server from './server';

dotenv.config();

(async () => {
  server.listen(CONFIG.SERVER.PORT, () => {
    console.info(`Server is running at http://localhost:${CONFIG.SERVER.PORT}.`);
  });
})();
