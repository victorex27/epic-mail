import jwt from 'jsonwebtoken';
import bcrptjs from 'bcryptjs';
import customValidator from '../custom-validator';
import db from '../../helpers/query';


class User {
  static async create(req, res) {
    customValidator(req, res);
    // encrypt password before storing
    const salt = bcrptjs.genSaltSync(10);
    const hash = bcrptjs.hashSync(req.body.password, salt);


    const values = [req.body.email, req.body.firstName, req.body.lastName, hash];
    const text = `INSERT INTO
        users(email, first_name, last_name, password)
        VALUES($1, $2, $3, $4)
        returning *`;
    const rows = await db.runQuery(text, values);
    if (rows === 1) {
      return res.status(404).json({ status: 404, error: 'User account already exists' });
    }
    if (rows === 2) {
      return res.status(404).json({ status: 404, error: 'Unknown error' });
    }

    const token = jwt.sign({ id: rows.id, email: rows.email }, process.env.YOUR_SECRET_KEY, { expiresIn: '1h' });
    return res.status(201).json({ status: 201, data: { token } });
  }
}

export default User;
