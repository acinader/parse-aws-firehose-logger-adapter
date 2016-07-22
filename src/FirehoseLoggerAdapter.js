const WinstonLoggerAdapter = require('parse-server').WinstonLoggerAdapter;
const WinstonFirehose = require('winston-firehose');
console.log(WinstonLoggerAdapter);

export class FirehoseLoggerAdapter extends WinstonLoggerAdapter {
  constructor(streamName, firehoseOptions) {
    super();
    if (process.env.NODE_ENV !== 'test') {
      const transport = new WinstonFirehose(firehoseOptions);
      this.addTransport(transport);
    }
  }
}

export default FirehoseLoggerAdapter;
module.exports = FirehoseLoggerAdapter;

