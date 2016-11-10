const FirehoseLoggerAdapter = require('../../lib/index.js').FirehoseLoggerAdapter;
const raw = require('config/raw').raw;

module.exports = {
  logger: raw(new FirehoseLoggerAdapter({ streamName: 'test' })),
};
