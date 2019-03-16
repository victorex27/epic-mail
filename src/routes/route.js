import express from 'express';
import checkAPIs from 'express-validator/check';
import { sanitizeParam } from 'express-validator/filter';
import User from '../controllers/user';
import Message from '../controllers/message';


const router = express();
const { check } = checkAPIs;
const checkLengthGreaterThanOne = (name => check(name).exists().isLength({ min: 1 }).withMessage(`${name} is required`)
  .trim());
const mailCheck = (name => check(name).exists().isEmail().withMessage('Invalid Email Format')
  .trim());


const emailCheck = mailCheck('email');
const fromCheck = mailCheck('from');
const toCheck = mailCheck('to');

const passwordCheck = check('password').exists()
  .isLength({ min: 6 })
  .withMessage('Password must be greater than or equal to 6 characters')
  .trim();
const firstNameCheck = checkLengthGreaterThanOne('firstName');
const lastNameCheck = checkLengthGreaterThanOne('lastName');
const subjectCheck = checkLengthGreaterThanOne('subject');
const messageCheck = checkLengthGreaterThanOne('message');

const idSanitizer = sanitizeParam('id').toInt();

router.post('/auth/signup', [emailCheck, passwordCheck, firstNameCheck, lastNameCheck], User.create);

router.post('/auth/login', [emailCheck, passwordCheck], User.login);

router.post('/messages', [fromCheck, toCheck, subjectCheck, messageCheck], Message.post);
router.get('/messages', Message.getInbox);
router.get('/messages/sent', Message.getAllSentMessages);
router.get('/messages/unread', Message.getUnreadInbox);
router.get('/messages/:id', [idSanitizer], Message.getMessageById);
router.delete('/messages/:id', [idSanitizer], Message.deleteMessage);

export default router;
