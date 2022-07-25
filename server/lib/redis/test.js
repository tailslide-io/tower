const RedisTimeSeriesClient = require('./redisTimeSeriesClient');

(async () => {
  const client = new RedisTimeSeriesClient(null);
  await client.init();
  const flagId = 1;
  const result = await client.queryTimeWindow(flagId);
  console.log(result);
})();
