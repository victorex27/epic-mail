import db from '../db';

class Query {
  static async runQuery(text, values) {
    try {
      const { rows } = await db.query(text, values);
      console.log(rows);
      return rows;
    } catch (error) {
      // @return 1 signifies Duplicate entry
      console.log(error);
      
        return {error: error.routine };
    }
  }
}

export default Query;
