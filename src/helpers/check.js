import checkAPIs from 'express-validator/check';
import { sanitizeParam } from 'express-validator/filter';

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
