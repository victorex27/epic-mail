import db from '../db';

class Query {
  static async runQuery(text, values) {
    try {
      const { rows } = await db.query(text, values);
      return rows;
    } catch (error) {
      // @return 1 signifies Duplicate entry

      if (error.routine === '_bt_check_unique') {
        return error;
      }
      return error; 
    }
  }
}

export default Query;
