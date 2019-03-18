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
    try {
      const { rows } = await db.query(text, values);

      return res.status(200).json({ status: 200, data: rows[0] });
    } catch (error) {
      let detail;
      if (error.detail) {
        detail = error.detail;
      } else {
        detail = 'Unknown error';
      }
      return res.status(404).json({ status: 404, error: detail });
    }
  }

  /*
      if (result.error) {
        return res.status(result.status).json({ status: result.status, error: result.data });
      }
      return res.status(result.status).json({ status: result.status, data: result.data });
      */
}

export default Group;
