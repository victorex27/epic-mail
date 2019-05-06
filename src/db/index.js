import { Pool } from 'pg';
import dotenv from 'dotenv';
import { userTable, messageTable } from './migration';
import { userSeed , messageSeed } from './seed';
import 'idempotent-babel-polyfill'; // for babel not to be called twice

dotenv.config();

let connectionUrl = process.env.DATABASE_URL;
let initializerQuery = userTable + messageTable + userSeed + messageSeed;

if (process.env.NODE_ENV === 'production') {
  connectionUrl = process.env.DATABASE_URL_PROD;
  initializerQuery = userTable + messageTable;
} else if (process.env.NODE_ENV === 'development') {
  connectionUrl = process.env.DATABASE_URL_DEV;
  initializerQuery = userTable + messageTable;
}


const pool = new Pool({
  connectionString: connectionUrl,
});


const query = ((text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
}));


query(initializerQuery, []);

export default {

  query,
};
