'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WinstonLoggerAdapter = require('parse-server').WinstonLoggerAdapter;
var WinstonFirehose = require('winston-firehose');
console.log(WinstonLoggerAdapter);

var FirehoseLoggerAdapter = exports.FirehoseLoggerAdapter = function (_WinstonLoggerAdapter) {
  _inherits(FirehoseLoggerAdapter, _WinstonLoggerAdapter);

  function FirehoseLoggerAdapter(streamName, firehoseOptions) {
    _classCallCheck(this, FirehoseLoggerAdapter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FirehoseLoggerAdapter).call(this));

    if (process.env.NODE_ENV !== 'test') {
      var transport = new WinstonFirehose(firehoseOptions);
      _this.addTransport(transport);
    }
    return _this;
  }

  return FirehoseLoggerAdapter;
}(WinstonLoggerAdapter);

exports.default = FirehoseLoggerAdapter;

module.exports = FirehoseLoggerAdapter;