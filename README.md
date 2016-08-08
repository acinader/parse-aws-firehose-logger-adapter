[![Build Status](https://travis-ci.org/acinader/parse-aws-firehose-logger-adapter.svg?branch=master)](https://travis-ci.org/acinader/parse-aws-firehose-logger-adapter)
[![codecov](https://codecov.io/gh/acinader/parse-aws-firehose-logger-adapter/branch/master/graph/badge.svg)](https://codecov.io/gh/acinader/parse-aws-firehose-logger-adapter)

# Parse AWS Firehose Logger Adapter
Enable parse-server -> AWS Firehose -> Elastic Search -> Kibana

Aggregate logs from a cluster of Parse Servers

### How to use ###

```
loggerAdapter: new FirehoseLoggerAdapter({ streamName });
```
Other winston logger options can also be passed:
```
loggerAdapter: new FirehoseLoggerAdapter({ streamName, level: 'verbose' });
```

Note: FirehoseLoggerAdapter is dependent on https://github.com/ParsePlatform/parse-server/pull/2363
