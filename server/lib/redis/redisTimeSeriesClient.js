// Connect to Redis
// Incoming Payload from Front-End
// Get the Timebucket
// Amount of Time
// Bucket Size
// Flag Id - obtained from the URL

const { createClient } = require('redis');
const { TimeSeriesAggregationType } = require('@redis/time-series');

class RedisTimeSeriesClient {
  constructor(redisAddress) {
    this.redisAddress = redisAddress || 'http://localhost:6379';
    this.redisClient = null;
  }

  async init() {
    this.redisClient = createClient(this.redisAddress);
    await this.redisClient.connect();
  }

  async queryTimeWindow(flagId, timeRange = 600000, timeBucket = 60000) {
    const currentTime = Date.now();
    const startTime = currentTime - timeRange;
    const queryResult = await this.redisClient?.ts.MRANGE(
      startTime,
      currentTime,
      `flagId=${flagId}`,
      {
        AGGREGATION: {
          type: TimeSeriesAggregationType.SUM,
          timeBucket,
        },
        ALIGN: 'start',
      }
    );
    return this.transformQueryResult(
      queryResult,
      startTime,
      timeRange,
      timeBucket
    );
  }

  transformQueryResult(queryResult, startTime, timeRange, timeBucket) {
    let timestamp = startTime;
    let intervalCounts = Math.ceil(timeRange / timeBucket);
    let intervalValues = [];
    let successSamples =
      queryResult.find((obj) => /success/.test(obj.key))?.samples.slice() || [];
    let failureSamples =
      queryResult.find((obj) => /failure/.test(obj.key))?.samples.slice() || [];

    for (let x = 0; x < intervalCounts; x++) {
      let value = { timestamp };
      value.success = this.samplesValueAtTimestamp(successSamples, timestamp);
      value.failure = this.samplesValueAtTimestamp(failureSamples, timestamp);
      intervalValues.push(value);
      timestamp += timeBucket;
    }
    return intervalValues;
  }

  samplesValueAtTimestamp(samples, timestamp) {
    if (samples[0]?.timestamp === timestamp) {
      return samples.shift().value;
    } else {
      return 0;
    }
  }
  /*
{
  "payload": [
    {
      "key": "1:failure",
      "samples": [
        {
          "timestamp": 1658783066947,
          "value": 2
        }
      ]
    },
    {
      "key": "1:success",
      "samples": [
        {
          "timestamp": 1658783060947,
          "value": 1
        },
        {
          "timestamp": 1658783066947,
          "value": 3
        }
      ]
    }
  ]
}
  [
    {
      "timestamp": 160292384
      "success": 5
      "failure": 2
    }
  ]
  How many intervals?
    timeRange / timeBucket => round up (Math.ceil)
  initial timestamp = NOW - timeRange
  ending timestamp = NOW
  For each interval (with index)
    Get the samples from success and failure with current timestamp using the helper
    
  timestamp+= timeBucket

  Helper method that takes samples and timestamp
    - if the first object's timestamp == timestamp
      shift the samples and return its value
    - else return 0
  */

  async endConnection() {
    await this.redisClient?.quit();
  }
}

module.exports = RedisTimeSeriesClient;
