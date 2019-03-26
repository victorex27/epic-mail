import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill'; // for babel not to be called twice

dotenv.config();

let connectionUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.DATABASE_URL_PROD;
} else if (process.env.NODE_ENV === 'development') {
  connectionUrl = process.env.DATABASE_URL_DEV;
}

console.log('connection string',connectionUrl);
const pool = new Pool({
  connectionString: connectionUrl,
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
