import { validationResult } from 'express-validator/check';
/** Custom validator wrapper */
const customValidator = (req) => {
  const errors = validationResult(req);
  const res = { status: '', error: '' };
  if (!errors.isEmpty()) {
    const error = errors.array();
    res.status = 400;
    res.error = error[0].msg;
  }
  return res;
};

export default customValidator;
