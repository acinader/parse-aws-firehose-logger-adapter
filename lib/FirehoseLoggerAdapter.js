const ParseServer = require('parse-server');
const WinstonFirehose = require('winston-firehose');

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export class FirehoseLoggerAdapter extends ParseServer.LoggerAdapter {
  constructor(streamName, firehoseOptions) {
    this.streamName = streamName;
    this.firehoseOptions = firehoseOptions;
    this.logger = new WinstonFirehose(streamName, firehoseOptions);
  }

  info() {
    return this.logger.info.apply(undefined, arguments);
  }
  error() {
    return this.logger.info.apply(undefined, arguments);
  }

  query(passedInOptions, callback = () => {}) {
    const options = !passedInOptions ? {} : passedInOptions;

    // defaults to 7 days prior
    const from = options.from || new Date(Date.now() - (7 * MILLISECONDS_IN_A_DAY));
    const until = options.until || new Date();
    const limit = options.size || 10;
    const order = options.order || 'desc';
    const level = options.level || 'info';

    const finalOptions = {
      from,
      until,
      limit,
      order,
    };

    return new Promise((resolve, reject) => {
      this.logger.query(finalOptions, (err, res) => {
        if (err) {
          callback(err);
          return reject(err);
        }
        if (level === 'error') {
          callback(res['parse-server-error']);
          return resolve(res['parse-server-error']);
        }
        callback(res['parse-server']);
        return resolve(res['parse-server']);
      });
    });
  }
}
