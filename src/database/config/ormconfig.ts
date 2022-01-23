import { join } from 'path';

import * as config from 'config';

const dbConfig = config.get('typeorm');

const typeOrmConfig = {
  type: dbConfig.type,
  host: process.env.TYPEORM_HOSTNAME || dbConfig.host,
  port: process.env.TYPEORM_PORT || dbConfig.port,
  username: process.env.TYPEORM_USERNAME || dbConfig.username,
  password: process.env.TYPEORM_PASSWORD || dbConfig.password,
  database: process.env.TYPEORM_DATABASE || dbConfig.database,
  entities: [join(__dirname, '../..', 'models', '**', '*.entity.{js,ts}')],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};

module.exports = typeOrmConfig;
