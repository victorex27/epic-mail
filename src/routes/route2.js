import express from 'express';
import User from '../controllers/v2/user';
import Message from '../controllers/v2/message';
import Group from '../controllers/v2/group';
import {
  emailCheck, passwordCheck, firstNameCheck, lastNameCheck,
  toCheck, subjectCheck, messageCheck, checkToken, idSanitizer,
} from '../helpers/check';

const router = express.Router();
// router for User features
router.post('/auth/signup', [emailCheck, passwordCheck, firstNameCheck, lastNameCheck], User.create);
router.post('/auth/login', [emailCheck, passwordCheck], User.login);

// router for messages features
router.post('/messages', [subjectCheck,
  messageCheck,
  checkToken,
], Message.post);
router.get('/messages', [checkToken], Message.getInbox);
router.get('/messages/sent', [checkToken], Message.getAllSentMessages);
router.get('/messages/unread', [checkToken], Message.getUnreadInbox);
router.get('/messages/draft', [checkToken], Message.getDraft);
router.get('/messages/:id', [idSanitizer, checkToken], Message.getMessageById);
router.delete('/messages/:id', [idSanitizer, checkToken], Message.deleteMessage);

// router for group feature
router.post('/groups', [checkToken], Group.create);
router.get('/groups', [checkToken], Group.getAllGroups);
router.patch('/groups/:groupId/name', [checkToken], Group.updateGroupName);
router.delete('/groups/:groupId', [checkToken], Group.deleteGroup);
router.post('/groups/:groupId/users', [checkToken], Group.addUsersToGroup);
router.delete('/groups/:groupId/users/:userId', [checkToken], Group.deleteMemberFromGroup);
router.post('/groups/:groupId/messages', [checkToken], Group.sendMailToGroup);

export default router;
