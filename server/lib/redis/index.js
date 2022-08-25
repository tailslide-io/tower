const RedisTimeSeriesClient = require('./redisTimeSeriesClient');

module.exports = (async () => {
  const redisAddress = process.env.REDIS_SERVER || null;
  const redisClient = new RedisTimeSeriesClient(redisAddress);
  await redisClient.init();
  return redisClient;
})();
