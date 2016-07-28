# Parse AWS Firehose Logger Adapter
Enable parse-server to log to AWS Firehose to and Elastic Search for log browsing/searching with Kibana


### How to use ###

```
loggerAdapter: new FirehoseLoggerAdapter({ streamName });
```
Other winston logger options can also be passed:
```
loggerAdapter: new FirehoseLoggerAdapter({ streamName, level: 'verbose' });
```

Note: FirehoseLoggerAdapter is dependent on https://github.com/ParsePlatform/parse-server/pull/2363
