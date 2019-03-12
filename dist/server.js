"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _route = _interopRequireDefault(require("./routes/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_express.default.json());
app.use('/api/v1', _route.default);
app.get('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'resource not found'
  });
});
var portNumber = process.env.PORT || 3000;
var server = app.listen(portNumber);
console.log('app running on port ', portNumber);
var _default = server;
exports.default = _default;