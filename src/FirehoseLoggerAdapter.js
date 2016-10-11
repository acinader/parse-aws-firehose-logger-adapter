import { WinstonLoggerAdapter } from 'parse-server/lib/Adapters/Logger/WinstonLoggerAdapter';

const WinstonFirehose = require('winston-firehose');

const DEFAULT_REGION = 'us-east-1';

export class FirehoseLoggerAdapter extends WinstonLoggerAdapter {
  constructor(arg) {
    super(arg);
    this.optionsFromArguments(arg);

    if (process.env.NODE_ENV !== 'test') {
      const transport = new WinstonFirehose(this.options);
      this.addTransport(transport);
    }
  }

  // following three functions copied from s3Adapter.  Would be nice to have a lib...
  requiredOrFromEnvironment(key, env) {
    // eslint-disable-next-line no-param-reassign
    this.options[key] = this.options[key] || process.env[env];

    if (!this.options[key]) {
      throw new Error(`FirehoseLoggerAdapter requires option '${key}' or env. variable ${env}`);
    }
    return this.options;
  }

  fromEnvironmentOrDefault(key, env, defaultValue) {
    // eslint-disable-next-line no-param-reassign
    this.options[key] = this.options[key] || process.env[env] || defaultValue;
    return this.options;
  }

  optionsFromArguments(streamNameOrOptions) {
    this.options = {};
    if (typeof streamNameOrOptions === 'string') {
      this.options.streamName = streamNameOrOptions;
    } else {
      this.options = streamNameOrOptions || {};
    }
    this.options = this.requiredOrFromEnvironment('streamName', 'FIREHOSE_LOGGER_STREAM_NAME');

    let firehoseOptions = this.options.firehoseOptions || {};
    firehoseOptions = this.fromEnvironmentOrDefault(
      firehoseOptions, 'region', 'FIREHOSE_LOGGER_REGION', DEFAULT_REGION);
    firehoseOptions = this.fromEnvironmentOrDefault(
      firehoseOptions, 'level', 'FIREHOSE_LOGGER_LEVEL', '');
    this.options.firehoseOptions = firehoseOptions;
  }
}

module.exports = FirehoseLoggerAdapter;
export default FirehoseLoggerAdapter;
