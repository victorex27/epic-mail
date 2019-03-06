import express from 'express';
import User from '../controllers/user';

const router = express();

router.post('/auth/signup', User.create);
router.post('/auth/login', User.login);

export default router;
