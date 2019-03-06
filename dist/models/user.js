"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);

    this.users = [];
    var existingUser1 = {
      id: 1,
      email: 'aobikobe@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password'
    };
    var existingUser2 = {
      id: 2,
      email: 'aob@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password'
    };
    var existingUser3 = {
      id: 3,
      email: 'arinze@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password'
    };
    var existingUser4 = {
      id: 4,
      email: 'ao@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password'
    };
    this.users.push(existingUser1);
    this.users.push(existingUser2);
    this.users.push(existingUser3);
    this.users.push(existingUser4);
    this.lastInsertId = 5;
  }

  _createClass(User, [{
    key: "create",
    value: function create(data) {
      var errorMessage = {
        error: ''
      };
      var doesUserExists = this.users.find(function (user) {
        return user.email === data.email;
      });

      if (!data.email || !data.firstName || !data.lastName || !data.password) {
        errorMessage.error = 'One or more fields are empty';
        return errorMessage;
      }

      if (doesUserExists) {
        errorMessage.error = 'User already exists';
        return errorMessage;
      }

      var newId = this.lastInsertId + 1;
      this.lastInsertId += 1;
      var newUser = {
        id: newId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
      };
      this.users.push(newUser);
      return newUser;
    }
  }, {
    key: "findOne",
    value: function findOne(email) {
      var errorMessage = {
        error: ''
      };

      if (!email) {
        errorMessage.error = 'Invalid parameter';
        return errorMessage;
      }

      var user = this.users.find(function (u) {
        return u.email === email;
      });

      if (!user) {
        errorMessage.error = 'User does not exists';
        return errorMessage;
      }

      return user;
    }
  }, {
    key: "login",
    value: function login(data) {
      var errorMessage = {
        error: ''
      };

      if (!data.email || !data.password) {
        errorMessage.error = 'Invalid parameter';
        return errorMessage;
      }

      var user = this.users.find(function (u) {
        return u.email === data.email && u.password === data.password;
      });

      if (!user) {
        errorMessage.error = 'User does not exists';
        return errorMessage;
      }

      return user;
    }
  }]);

  return User;
}();

var _default = new User();

exports.default = _default;