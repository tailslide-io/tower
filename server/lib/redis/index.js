const RedisTimeSeriesClient = require('./redisTimeSeriesClient');

module.exports = (async () => {
  const redisClient = new RedisTimeSeriesClient(JSON.parse(process.env.REDIS_SERVER) || 'http://localhost:6379');
  await redisClient.init();
  return redisClient;
})();
