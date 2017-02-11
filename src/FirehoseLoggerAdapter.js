import { WinstonLoggerAdapter } from 'parse-server/lib/Adapters/Logger/WinstonLoggerAdapter';

const WinstonFirehose = require('winston-firehose');

const DEFAULT_REGION = 'us-east-1';

export class FirehoseLoggerAdapter extends WinstonLoggerAdapter {
  constructor(arg) {
    super(arg);
    this.options = FirehoseLoggerAdapter.optionsFromArguments(arg);

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
      const transport = new WinstonFirehose(this.options);
      this.addTransport(transport);
    }
  }

  // following three functions copied from s3Adapter.  Would be nice to have a lib...
  static requiredOrFromEnvironment(args, key, env) {
    // special case
    if (key === 'streamName' && typeof args === 'string') {
      return args;
    }

    const val = (args && args[key]) || process.env[env];

    if (!val) {
      throw new Error(`FirehoseLoggerAdapter requires option '${key}' or env. variable ${env}`);
    }
    return val;
  }

  static fromEnvironmentOrDefault(args, key, env, defaultValue) {
    const val = (args && args[key]) ||
      process.env[env] ||
      defaultValue;

    return val;
  }

  static optionsFromArguments(streamNameOrOptions) {
    const options = {};

    const args = typeof streamNameOrOptions === 'string' ? {} : streamNameOrOptions;
    options.streamName = FirehoseLoggerAdapter.requiredOrFromEnvironment(
      streamNameOrOptions,
      'streamName',
      'FIREHOSE_LOGGER_STREAM_NAME');
    options.level = FirehoseLoggerAdapter.fromEnvironmentOrDefault(streamNameOrOptions, 'level', 'FIREHOSE_LOGGER_LEVEL', '');

    const firehoseOptions = {};
    firehoseOptions.region = FirehoseLoggerAdapter.fromEnvironmentOrDefault(
      firehoseOptions, 'region', 'FIREHOSE_LOGGER_REGION', DEFAULT_REGION);


    options.firehoseOptions = {};
    Object.assign(options.firehoseOptions, firehoseOptions, (args && args.firehoseOptions) || {});
    return options;
  }
}

module.exports = FirehoseLoggerAdapter;
export default FirehoseLoggerAdapter;
