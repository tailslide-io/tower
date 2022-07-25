import { connect, consumerOpts, createInbox, JSONCodec } from 'nats.ws';

const jsonCoder = JSONCodec();

export async function natsConnect(setNatsClient, reducer, dispatch) {
  const options = consumerOpts(); // creates a Consumer Options Object
  options.deliverNew(); // ensures that the newest message on the stream is delivered to the consumer when it comes online
  options.ackAll(); // acknowledges all previous messages
  options.deliverTo(createInbox()); // ensures that the Consumer listens to a specific Subject
  try {
    const natsClient = await connect({
      servers: [process.env.REACT_APP_NATS_WS_SERVER || 'ws://0.0.0.0:8080'],
      token: process.env.REACT_APP_SDK_KEY,
    });
    setNatsClient(natsClient);
    const jetStream = natsClient.jetstream();
    const subscribedStream = await jetStream.subscribe('>', options);

    await (async () => {
      for await (const msg of subscribedStream) {
        const { subject } = msg;
        const data = jsonCoder.decode(msg.data);
        console.log('🚀 ~ file: nats.js ~ line 20 ~ forawait ~ data', data);
        dispatch(reducer({ subject, data }));
      }
    })();
  } catch (err) {
    console.error(err);
  }
}
