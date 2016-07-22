const loggerAdapterTests = require('parse-server-conformance-tests').logger;
const FirehoseLoggerAdapter = require('../lib/index.js').FirehoseLoggerAdapter;

// If you want to actually send a test log, then set NODE_ENV to something
// other than 'test'.  See spec/helpers
describe('FirehoseLoggerAdapter tests', () => {
  const adapter = new FirehoseLoggerAdapter('testing123', {
    streamName: 'testing123',
    firehoseOptions: {
      region: 'us-east-1',
    },
  });
  loggerAdapterTests.testAdapter('FirehoseLoggerAdapter', adapter);
});
