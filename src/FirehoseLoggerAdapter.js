const WinstonLoggerAdapter = require(
  '../node_modules/parse-server/lib/Adapters/Logger/WinstonLoggerAdapter').WinstonLoggerAdapter;
const WinstonFirehose = require('winston-firehose');

// const Config = require('parse-server').Config;

export class FirehoseLoggerAdapter extends WinstonLoggerAdapter {
  constructor(streamName, firehoseOptions) {
    super();
    const transport = new WinstonFirehose(firehoseOptions);
    this.addTransport(transport);
  }
}

//export default FirehoseLoggerAdapter;
