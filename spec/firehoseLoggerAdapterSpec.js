const FirehoseLoggerAdapter = require('../lib/index.js').FirehoseLoggerAdapter;
const config = require('config');

// If you want to actually send a test log, then set NODE_ENV to something
// other than 'test'.  See spec/helpers
// process.env.NODE_ENV = 'foo';
describe('FirehoseLoggerAdapter configuration tests', () => {
  it('missing arguments throws', () => {
    expect(() => new FirehoseLoggerAdapter()).toThrow();
  });

  it('can configure with options', () => {
    expect(() => new FirehoseLoggerAdapter({ streamName: 'test-stream' })).not.toThrow();
  });

  it('can configure with string arg', () => {
    expect(() => new FirehoseLoggerAdapter('test-stream')).not.toThrow();
  });

  it('can configure with env var', () => {
    process.env.FIREHOSE_LOGGER_STREAM_NAME = 'test-stream';
    expect(() => new FirehoseLoggerAdapter()).not.toThrow();
    delete process.env.FIREHOSE_LOGGER_STREAM_NAME;
  });

  it('should be able to use immutable config', () => {
    const options = config.get('loggerOptions');
    const logger = new FirehoseLoggerAdapter(options);
    expect(logger).not.toBe(null);
  });
});
