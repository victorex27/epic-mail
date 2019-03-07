import express from 'express';
import User from '../controllers/user';
import Message from '../controllers/message';

const router = express();

router.post('/auth/signup', User.create);
router.post('/auth/login', User.login);
router.post('/messages', Message.post);
router.get('/messages', Message.getInbox);
router.get('/messages/sent', Message.getAllSentMessages);
router.get('/messages/unread', Message.getAllUnreadMessages);

export default router;
