"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} User object
   */
  create: function create(req, res) {
    var newUser = _user.default.create(req.body);

    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
      return res.status(400).json({
        status: 400,
        error: newUser.error
      });
    }

    return res.status(201).json({
      status: 201,
      data: [{
        token: '45erkjherht45495783'
      }]
    });
  }
};
var _default = User;
exports.default = _default;