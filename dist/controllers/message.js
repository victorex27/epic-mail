"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(require("../models/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      data: [{
        newMessage: newMessage
      }]
    });
  },
  getInbox: function getInbox(req, res) {
    var newMessage = _message.default.getInbox(req.body);

    if (newMessage.error) {
      return res.status(400).json({
        status: 400,
        error: newMessage.error
      });
    }

    return res.status(200).json({
      status: 200,
      data: [_objectSpread({}, newMessage)]
    });
  }
};
var _default = Message;
exports.default = _default;