import customValidator from '../custom-validator';

import db from '../../db';

class Group {
  static async create(req, res) {
    const data = req.body;
    const result = customValidator(req);
    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.error });
    }
    const text = `INSERT INTO
        groups(name, role, owner_id)
        VALUES($1, $2, $3)
        returning *`;

    const values = Object.values(data);
    Group.runQuery(text, values, res);
    return res;
  }

  static async getAll(req, res) {
    const text = 'SELECT * FROM groups';

    const values = [];

    Group.runQuery(text, values, res);
    return res;
  }

  static async runQuery(text, values, res) {
    try {
      const { rows } = await db.query(text, values);
      res.status(200).json({ status: 200, data: rows });
      return;
    } catch (error) {
      res.status(404).json({ status: 404, error: error.detail });
    }
  }
}

export default Group;
