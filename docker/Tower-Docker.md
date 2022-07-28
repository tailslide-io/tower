# How To Use
# Ensure the following files are in your current active repository:
  # init.sql
  # nats.conf
  # tailslide.yaml
  # .env (use the same variables as shown in env.md)

# Execute the command:
  # SDK_KEY=myToken docker-compose -f tailslide.yaml up
  # you can pass in whatever you want for 'myToken'

# Navigate to localhost:3000 and you should see the Tower Front-end

# Changes made to Tower

# created a Docker File for the Server - see Docker file

# see updated .env file

# created a Build folder in the Client and copied it to the Server

# Added Middleware - app.use(express.static('build'))

# Update initStreams in natsWrapper
<!-- 
  async initStreams(streamName) {
    let flagsStreamInfo;

    try {
      flagsStreamInfo = await this.jetStreamManager.streams.info(streamName);
    } catch (NatsError) {
      await this.jetStreamManager.streams.add({
        name: streamName,
        subjects: [
          process.env.NATS_AEROBAT_SUBJECT, // 'apps',
          CIRCUIT_OPEN_SUBJECT,
          CIRCUIT_CLOSE_SUBJECT,
          CIRCUIT_RECOVERY_START_SUBJECT,
          CIRCUIT_RECOVERY_UPDATE_SUBJECT,
        ],
      });
      flagsStreamInfo = await this.jetStreamManager.streams.info(streamName);
    } finally {
      this.flagsStreamInfo = flagsStreamInfo;
    }
  } -->

# Remove `null` in index.js of the redis folder
<!-- 
module.exports = (async () => {
  const redisClient = new RedisTimeSeriesClient(null);
  await redisClient.init();
  return redisClient;
})(); -->

# updated the RedisTimeSeriesClient Constructor
<!-- 
class RedisTimeSeriesClient {
  constructor(redisAddress) {
    this.redisAddress = redisAddress || 'http://localhost:6379';
    this.redisClient = null;
  } -->

# Updated the nats.conf to reflect new paths in the Container
<!-- 
websocket {
     port: 8080
     no_tls: true
}

authorization {
    token: "myToken"
}

jetstream {
  store_dir=/var/lib/nats/data
  max_memory_store: 1073741824
} -->

# Removed the .vscode, http, and lib/db/setup folder

# Removed postinstall from package.json


