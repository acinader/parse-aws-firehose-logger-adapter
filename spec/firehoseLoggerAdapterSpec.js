const loggerAdapterTests = require('parse-server-conformance-tests').logger;

// const FirehosLoggerAdapter = require('../index.js');
// I don't know the "right" way to do this...
// const FileLoggerAdapter = require(
//  '../node_modules/parse-server/lib/Adapters/Logger/FileLoggerAdapter').FileLoggerAdapter;
const FirehoseLoggerAdapter = require('../lib/FirehoseLoggerAdapter').FirehoseLoggerAdapter;

describe('FirehoseLoggerAdapter tests', () => {
//if (process.env.TEST_S3_ACCESS_KEY && process.env.TEST_S3_SECRET_KEY && process.env.TEST_S3_BUCKET) {
  // Should be initialized from the env

  const adapter = new FirehoseLoggerAdapter('testing123', {
    streamName: 'testing123',
    firehoseOptions: {
      region: 'us-east-1',
    },
  });
  loggerAdapterTests.testAdapter('FirehoseLoggerAdapter', adapter);
});
