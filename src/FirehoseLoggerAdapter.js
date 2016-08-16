import { WinstonLoggerAdapter } from 'parse-server/lib/Adapters/Logger/WinstonLoggerAdapter';
const WinstonFirehose = require('winston-firehose');

const DEFAULT_REGION = 'us-east-1';

export class FirehoseLoggerAdapter extends WinstonLoggerAdapter {
  constructor(arg) {
    super(arg);
    const options = this.optionsFromArguments(arg);

    if (process.env.NODE_ENV !== 'test') {
      const transport = new WinstonFirehose(options);
      this.addTransport(transport);
    }
  }

  // following three functions copied from s3Adapter.  Would be nice to have a lib...
  requiredOrFromEnvironment(options, key, env) {
    options[key] = options[key] || process.env[env]; // eslint-disable-line no-param-reassign

    if (!options[key]) {
      throw new Error(`FirehoseLoggerAdapter requires option '${key}' or env. variable ${env}`);
    }
    return options;
  }

  fromEnvironmentOrDefault(options, key, env, defaultValue) {
    // eslint-disable-next-line no-param-reassign
    options[key] = options[key] || process.env[env] || defaultValue;
    return options;
  }

  optionsFromArguments(streamNameOrOptions) {
    let options = {};
    if (typeof streamNameOrOptions === 'string') {
      options.streamName = streamNameOrOptions;
    } else {
      options = streamNameOrOptions || {};
    }
    options = this.requiredOrFromEnvironment(options, 'streamName', 'FIREHOSE_LOGGER_STREAM_NAME');

    let firehoseOptions = options.firehoseOptions || {};
    firehoseOptions = this.fromEnvironmentOrDefault(
      firehoseOptions, 'region', 'FIREHOSE_LOGGER_REGION', DEFAULT_REGION);
    firehoseOptions = this.fromEnvironmentOrDefault(
      firehoseOptions, 'level', 'FIREHOSE_LOGGER_LEVEL', '');
    options.firehoseOptions = firehoseOptions;

    return options;
  }
}

module.exports = FirehoseLoggerAdapter;
export default FirehoseLoggerAdapter;
