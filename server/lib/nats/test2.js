(async () => {
  const nats = await require('./setup');
  await nats.publish('app3', 'Testing publish number 1 to app 3');
  await nats.endConnection();
})();
