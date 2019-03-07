"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _message = _interopRequireDefault(require("../controllers/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.default)();
router.post('/auth/signup', _user.default.create);
router.post('/auth/login', _user.default.login);
router.post('/messages', _message.default.post);
router.get('/messages', _message.default.getInbox);
router.get('/messages/sent', _message.default.getAllSentMessages);
router.get('/messages/unread', _message.default.getUnreadInbox);
router.get('/messages/:id', _message.default.getMessageById);
var _default = router;
exports.default = _default;