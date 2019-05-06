import db from '../db';

class Query {
  static async runQuery(text, values) {
    try {
      console.log(' this is the value '+values);
      const { rows } = await db.query(text, values);
      
      return rows;
    } catch (error) {
      // @return 1 signifies Duplicate entry
      console.log(error);

      return { error: error.routine };
    }
  }
}

export default Query;
