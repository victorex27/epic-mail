import express from 'express';
import User from '../controllers/user';

const router = express();

router.post('/auth/signup', User.create);

export default router;
