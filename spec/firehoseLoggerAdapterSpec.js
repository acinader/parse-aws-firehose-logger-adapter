const loggerAdapterTests = require('parse-server-conformance-tests').logger;
const FirehoseLoggerAdapter = require('../lib/index.js').FirehoseLoggerAdapter;

// If you want to actually send a test log, then set NODE_ENV to something
// other than 'test'.  See spec/helpers
// process.env.NODE_ENV = 'foo';
describe('FirehoseLoggerAdapter adapter tests', () => {
  const options = {
    region: 'us-east-1',
  };

  const adapter = new FirehoseLoggerAdapter('testing123', options);
  loggerAdapterTests.testAdapter('FirehoseLoggerAdapter', adapter);
});

describe('FirehoseLoggerAdapter configuration tests', () => {
  it('missing arguments throws', () => {
    expect(() => new FirehoseLoggerAdapter()).toThrow();
  });

  it('can configure with string arg', () => {
    expect(() => new FirehoseLoggerAdapter('test-stream').not.toThrow());
  });

  it('can configure with env var', () => {
    process.env.FIREHOSE_LOGGER_STREAM_NAME = 'test-stream';
    expect(() => new FirehoseLoggerAdapter({ name: 'test3' })).not.toThrow();
    delete process.env.FIREHOSE_LOGGER_STREAM_NAME;
  });
});
