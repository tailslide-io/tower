const { createClient } = require('redis');
const { TimeSeriesAggregationType } = require('@redis/time-series');

class RedisTimeSeriesClient {
  constructor(redisAddress) {
    this.redisAddress = redisAddress;
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
    let intervalBuckets = [];
    let successSamples =
      queryResult.find((obj) => /success/.test(obj.key))?.samples.slice() || [];
    let failureSamples =
      queryResult.find((obj) => /failure/.test(obj.key))?.samples.slice() || [];

    for (let x = 0; x < intervalCounts; x++) {
      let bucket = { timestamp };
      bucket.success = this.samplesValueAtTimestamp(successSamples, timestamp);
      bucket.failure = this.samplesValueAtTimestamp(failureSamples, timestamp);
      intervalBuckets.push(bucket);
      timestamp += timeBucket;
    }
    return intervalBuckets;
  }

  samplesValueAtTimestamp(samples, timestamp) {
    if (samples[0]?.timestamp === timestamp) {
      return samples.shift().value;
    } else {
      return 0;
    }
  }

  async endConnection() {
    await this.redisClient?.quit();
  }
}

module.exports = RedisTimeSeriesClient;
