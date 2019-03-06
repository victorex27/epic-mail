"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Message =
/*#__PURE__*/
function () {
  function Message() {
    _classCallCheck(this, Message);

    this.messages = [];
    var insertMessage1 = {
      id: 1,
      createdOn: 'now',
      subject: 'Hello',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 1,
      receiverId: 2
    };
    var insertMessage2 = {
      id: 2,
      createdOn: 'now',
      subject: 'you there',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 1,
      receiverId: 2
    };
    var insertMessage3 = {
      id: 3,
      createdOn: 'now',
      subject: 'how far',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 2,
      receiverId: 1
    };
    var insertMessage4 = {
      id: 4,
      createdOn: 'now',
      subject: 'how far',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 2,
      receiverId: 1
    };
    this.lastInsertId = 5;
    this.messages.push(insertMessage1);
    this.messages.push(insertMessage2);
    this.messages.push(insertMessage3);
    this.messages.push(insertMessage4);
  }

  _createClass(Message, [{
    key: "post",
    value: function post(data) {
      var errorMessage = {
        error: ''
      };

      var sender = _user.default.findOne(data.from);

      var receiver = _user.default.findOne(data.to);

      if (sender.error === 'User does not exists') {
        errorMessage.error = 'Incorrect sender Id';
        return errorMessage;
      }

      if (receiver.error === 'User does not exists') {
        errorMessage.error = 'Incorrect receiver Id';
        return errorMessage;
      }

      if (sender.id === receiver.id) {
        errorMessage.error = 'Sender id and receiver id can not be the same';
        return errorMessage;
      }

      var newId = this.lastInsertId + 1;
      this.lastInsertId += 1;
      var insertMessage = {
        id: newId,
        createdOn: 'now',
        subject: data.subject,
        message: data.message,
        parentMessageId: 0,
        status: 'sent',
        senderId: sender.id,
        receiverId: receiver.id
      };
      var newMessage = {};
      newMessage.id = insertMessage.id;
      newMessage.createdOn = insertMessage.createdOn;
      newMessage.subject = insertMessage.subject;
      newMessage.message = insertMessage.message;
      newMessage.parentMessageId = insertMessage.parentMessageId;
      newMessage.status = insertMessage.status;
      this.messages.push(insertMessage);
      return newMessage;
    }
  }, {
    key: "getAllSentMessages",
    value: function getAllSentMessages(email) {
      var errorMessage = {
        error: ''
      };

      var sender = _user.default.findOne(email);

      if (sender.error === 'User does not exists') {
        errorMessage.error = 'Unkwnown user';
        return errorMessage;
      } // const message = this.messages.find(m => m.senderId === sender.id);


      var message = this.messages.reduce(function (arr, msg) {
        if (msg.senderId === sender.id) {
          arr.push(msg);
        }

        return arr;
      }, []);

      if (message.length === 0) {
        // errorMessage.error = 'User does not exists';
        return {};
      }

      return message;
    }
  }, {
    key: "getInbox",
    value: function getInbox(email) {
      var errorMessage = {
        error: ''
      };

      var receiver = _user.default.findOne(email);

      if (receiver.error === 'User does not exists') {
        errorMessage.error = 'Unkwnown user';
        return errorMessage;
      } // const message = this.messages.find(m => m.senderId === sender.id);


      var message = this.messages.reduce(function (arr, msg) {
        if (msg.receiverId === receiver.id) {
          arr.push(msg);
        }

        return arr;
      }, []);

      if (message.length === 0) {
        // errorMessage.error = 'User does not exists';
        return {};
      }

      return message;
    }
  }, {
    key: "getUnreadInbox",
    value: function getUnreadInbox(email) {
      var errorMessage = {
        error: ''
      };

      var receiver = _user.default.findOne(email);

      if (receiver.error) {
        errorMessage.error = 'Unkwnown user';
        return errorMessage;
      } // const message = this.messages.find(m => m.senderId === sender.id);


      var message = this.messages.reduce(function (arr, msg) {
        if (msg.receiverId === receiver.id && msg.status !== 'read') {
          arr.push(msg);
        }

        return arr;
      }, []);

      if (message.length === 0) {
        // errorMessage.error = 'User does not exists';
        return {};
      }

      return message;
    }
  }, {
    key: "getMessageById",
    value: function getMessageById(id) {
      var errorMessage = {
        error: ''
      };
      var message = this.messages.find(function (msg) {
        return msg.id === id;
      });

      if (!message) {
        errorMessage.error = 'Invalid number';
        return errorMessage;
      }

      return message;
    }
  }, {
    key: "deleteMessage",
    value: function deleteMessage(id) {
      var errorMessage = {
        error: ''
      };
      var message = this.getMessageById(id);
      var result = {
        message: ''
      };

      if (message.error) {
        errorMessage.error = 'Invalid Message id';
        return errorMessage;
      }

      var index = this.messages.indexOf(message);

      if (index > -1) {
        this.messages.splice(index, 1);
      }

      result.message = message.message;
      return result; // this.messages.
    }
  }]);

  return Message;
}();

var _default = new Message();

exports.default = _default;