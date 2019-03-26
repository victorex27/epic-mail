import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import customValidator from '../custom-validator';
import db from '../../helpers/query';


class User {
  static async create(req, res) {
    customValidator(req, res);
    // encrypt password before storing

    try {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(req.body.password, salt);


      const values = [req.body.email, req.body.firstName, req.body.lastName, hash];
      const text = `INSERT INTO
        users(email, first_name, last_name, password)
        VALUES($1, $2, $3, $4)
        returning *`;
      const rows = await db.runQuery(text, values);

      if (rows.error) {
        if (rows.error === '_bt_check_unique') {
          throw new Error('User account already exists');
          
        }
        throw new Error('Unknown Error');
      }

      const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, process.env.YOUR_SECRET_KEY);
      return res.status(201).json({ status: 201, data: { token } });
    } catch (e) {
      return res.status(404).json({ status: 404, error: e.message });
    }
  }

  static async login(req, res) {
    try {
      customValidator(req, res);
      const values = [req.body.email];
      const text = `SELECT id,email,password FROM
          users WHERE email = $1
          `;

      const rows = await db.runQuery(text, values);

      if (rows.length === 1) {
        const result = bcryptjs.compareSync(req.body.password, rows[0].password);
        if (!result) res.status(401).json({ status: 401, error: 'Wrong password' });
        const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, process.env.YOUR_SECRET_KEY, { expiresIn: '1h' });
        return res.status(201).json({ status: 201, data: { token } });
      }
    } catch (error) {

    }


    return res.status(404).json({ status: 401, error: 'Unauthorized access' });
  }
}

export default User;
