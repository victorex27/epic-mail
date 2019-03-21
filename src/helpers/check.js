import checkAPIs from 'express-validator/check';
import { sanitizeParam } from 'express-validator/filter';
import jwt from 'jsonwebtoken';

const { check } = checkAPIs;
const checkLengthGreaterThanOne = (name => check(name).exists().isLength({ min: 1 }).withMessage(`${name} is required`)
  .trim());

export const mailCheck = (name => check(name).exists().isEmail().withMessage('Invalid Email Format')
  .trim());
export const emailCheck = mailCheck('email');
export const fromCheck = mailCheck('from');
export const toCheck = mailCheck('to');

export const passwordCheck = check('password').exists()
  .isLength({ min: 6, max: 40 })
  .withMessage('Password must be between 6 characters to 40 characters')
  .trim();

export const subjectCheck = checkLengthGreaterThanOne('subject');
export const messageCheck = checkLengthGreaterThanOne('message');
export const firstNameCheck = checkLengthGreaterThanOne('firstName');
export const lastNameCheck = checkLengthGreaterThanOne('lastName');

export const idSanitizer = sanitizeParam('id').toInt();

export const checkToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    const result = jwt.verify(token, process.env.YOUR_SECRET_KEY);
    req.user = result;
    next();
  } else {
    // If header is undefined
    res.status(403).json({ status: 403, error: 'Forbidden' });
  }
};
