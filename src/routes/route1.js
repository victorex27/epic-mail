import express from 'express';
import User from '../controllers/v1/user';
import Message from '../controllers/v1/message';
import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  toCheck, subjectCheck, messageCheck, idSanitizer,
} from '../helpers/check';

const router = express();

router.post('/auth/signup', [emailCheck, passwordCheck, firstNameCheck, lastNameCheck], User.create);

router.post('/auth/login', [emailCheck, passwordCheck], User.login);

router.post('/messages', [toCheck, subjectCheck, messageCheck], Message.post);
router.get('/messages', Message.getInbox);
router.get('/messages/sent', Message.getAllSentMessages);
router.get('/messages/unread', Message.getUnreadInbox);
router.get('/messages/:id', [idSanitizer], Message.getMessageById);
router.delete('/messages/:id', [idSanitizer], Message.deleteMessage);

export default router;
