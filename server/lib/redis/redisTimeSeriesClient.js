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

  async queryTimeWindow(flagId, timeRange = 600000, bucketSize = 60000) {
    const now = Date.now();
    const queryResults = await this.redisClient.ts.MRANGE(
      now - timeRange,
      now,
      `flagId=${flagId}`,
      {
        AGGREGATION: {
          type: TimeSeriesAggregationType.SUM,
          timeBucket: bucketSize,
        },
        ALIGN: 'start',
      }
    );
    return queryResults;
  }
}

module.exports = RedisTimeSeriesClient;
