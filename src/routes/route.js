import express from 'express';
import User from '../controllers/user';
import Message from '../controllers/message';

const router = express();

router.post('/auth/signup', User.create);
router.post('/messages', Message.post);
router.post('/auth/login', User.login);

export default router;
