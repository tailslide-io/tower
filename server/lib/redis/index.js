const RedisTimeSeriesClient = require('./redisTimeSeriesClient');

module.exports = (async () => {
  const redisClient = new RedisTimeSeriesClient(); // const redisClient = new RedisTimeSeriesClient(null);
  await redisClient.init();
  return redisClient;
})();
