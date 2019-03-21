import express from 'express';
import User from '../controllers/v2/user';
import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
} from '../helpers/check';


const router = express();
// router for User features
router.post('/auth/signup', [emailCheck, passwordCheck, firstNameCheck, lastNameCheck], User.create);


export default router;
