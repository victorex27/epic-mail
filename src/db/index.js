import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill'; // for babel not to be called twice

dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL_PROD,
});

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
