import { validationResult } from 'express-validator/check';
/** Custom validator wrapper */
const customValidator = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array();
    res.status(400).json({ status: 400, error: error[0].msg });
  }
};

export default customValidator;
