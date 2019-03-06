import UserModel from '../models/user';

const User = {
  create(req, res) {
    const newUser = UserModel.create(req.body);
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
      return res.status(400).json({ status: 400, error: newUser.error });
    }


    return res.status(201).json({ status: 201, data: [{ token: '45erkjherht45495783' }] });
  },

};

export default User;
