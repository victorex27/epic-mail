import customValidator from '../custom-validator';
import UserModel from '../../models/v1/user';


class User {
  static create(req, res) {
    const result = customValidator(req);
    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.error });
    }


    const newUser = UserModel.create(req.body);

    if (newUser.error) {
      return res.status(403).json({ status: 403, error: newUser.error });
    }


    return res.status(201).json({ status: 201, data: { token: '45erkjherht45495783' } });
  }

  static login(req, res) {
    const result = customValidator(req);
    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.error });
    }

    const newUser = UserModel.login(req.body);
    if (newUser.error) {
      return res.status(401).json({ status: 401, error: newUser.error });
    }

    return res.status(200).json({ status: 200, data: { token: '45erkjherht45495783' } });
  }

}

export default User;
