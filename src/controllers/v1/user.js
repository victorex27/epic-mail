import customValidator from '../custom-validator';
import UserModel from '../../models/v1/user';


class User {
  static create(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(404).json({ status: 404, error: validator.error });
    }
    const newUser = UserModel.create(req.body);

    if (newUser.error) {
      return res.status(403).json({ status: 403, error: newUser.error });
    }

    return res.status(201).json({ status: 201, data: { token: '45erkjherht45495783' } });
  }

  static login(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(404).json({ status: 404, error: validator.error });
    }
    const newUser = UserModel.login(req.body);
    if (newUser.error) {
      return res.status(401).json({ status: 401, error: newUser.error });
    }

    return res.status(201).json({ status: 201, data: { token: '45erkjherht45495783' } });
  }
}

export default User;
