import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill'; // for babel not to be called twice

dotenv.config();
let pool;

const env = process.env.NODE_ENV;
if (env === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_PROD,
  });
}
if (env === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL_DEV,
  });
}
if (env === 'test') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}


export default {

  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
