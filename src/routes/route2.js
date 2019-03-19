import express from 'express';
import checkAPIs from 'express-validator/check';
import { sanitizeParam } from 'express-validator/filter';
import Group from '../controllers/v2/group';


const router = express();
const { check } = checkAPIs;


const nameCheck = check('name').exists()
  .isLength({ min: 1 })
  .withMessage('Group name can not be empty')
  .trim();
const roleCheck = check('role').exists()
  .isLength({ min: 1 })
  .withMessage('Role can not be empty')
  .trim();
const idCheck = check('ownerId').exists()
  .isInt().withMessage('Invalid User id')
  .trim();
  /*
const firstNameCheck = checkLengthGreaterThanOne('firstName');
const lastNameCheck = checkLengthGreaterThanOne('lastName');
const subjectCheck = checkLengthGreaterThanOne('subject');
const messageCheck = checkLengthGreaterThanOne('message');

const idSanitizer = sanitizeParam('id').toInt();
*/
router.post('/groups', [nameCheck, roleCheck, idCheck], Group.create);
router.get('/groups', Group.getAll);

export default router;
