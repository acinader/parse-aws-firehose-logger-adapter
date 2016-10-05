[![Build Status](https://travis-ci.org/acinader/parse-aws-firehose-logger-adapter.svg?branch=master)](https://travis-ci.org/acinader/parse-aws-firehose-logger-adapter)
[![codecov](https://codecov.io/gh/acinader/parse-aws-firehose-logger-adapter/branch/master/graph/badge.svg)](https://codecov.io/gh/acinader/parse-aws-firehose-logger-adapter)

# Parse AWS Firehose Logger Adapter
If you're deploying parse-server onto an AWS cluster (either ecs, straight ec2, or elastic beanstalk).  It is useful to see all of the machines logs all in one place.  AWS Firehose will accept logging at any scale.  With just a few clicks on the AWS console, you can setup a firehose stream that feeds into elastic search.  AWS provides a link to a kibana ui to elastic search that makes visualizing your logs nice and easy.


#### parse-server -> AWS Firehose -> Elastic Search -> Kibana


### How to use ###

```
loggerAdapter: new FirehoseLoggerAdapter({ streamName });
```
Other winston logger options can also be passed:
```
loggerAdapter: new FirehoseLoggerAdapter({ streamName, level: 'verbose' });
```
