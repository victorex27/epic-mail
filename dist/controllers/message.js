"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(require("../models/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = {
  post: function post(req, res) {
    var newMessage = _message.default.post(req.body);

    if (newMessage.error) {
      return res.status(400).json({
        status: 400,
        error: newMessage.error
      });
    }

    return res.status(201).json({
      status: 201,
      data: newMessage
    });
  },
  getInbox: function getInbox(req, res) {
    var newMessage = _message.default.getInbox(req.body);

    if (newMessage.error) {
      return res.status(404).json({
        status: 404,
        error: newMessage.error
      });
    }

    return res.status(200).json({
      status: 200,
      data: newMessage
    });
  },
  getAllSentMessages: function getAllSentMessages(req, res) {
    var newMessage = _message.default.getAllSentMessages(req.body);

    if (newMessage.error) {
      return res.status(404).json({
        status: 404,
        error: newMessage.error
      });
    }

    return res.status(200).json({
      status: 200,
      data: newMessage
    });
  },
  getUnreadInbox: function getUnreadInbox(req, res) {
    var newMessage = _message.default.getUnreadInbox(req.body);

    if (newMessage.error) {
      return res.status(404).json({
        status: 404,
        error: newMessage.error
      });
    }

    return res.status(200).json({
      status: 200,
      data: newMessage
    });
  },
  getMessageById: function getMessageById(req, res) {
    var newMessage = _message.default.getMessageById(req.params.id);

    if (newMessage.error) {
      return res.status(404).json({
        status: 404,
        error: newMessage.error
      });
    }

    return res.status(200).json({
      status: 200,
      data: newMessage
    });
  },
  deleteMessage: function deleteMessage(req, res) {
    var newMessage = _message.default.deleteMessage(req.params.id);

    if (newMessage.error) {
      return res.status(404).json({
        status: 404,
        error: newMessage.error
      });
    }

    return res.status(200).json({
      status: 200,
      data: [newMessage]
    });
  }
};
var _default = Message;
exports.default = _default;