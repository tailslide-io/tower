import { connect, consumerOpts, createInbox, JSONCodec } from 'nats.ws';

const jsonCoder = JSONCodec();

export async function natsConnect(setNatsClient, reducer, dispatch) {
  const options = consumerOpts();
  options.deliverNew();
  options.ackAll(); 
  options.deliverTo(createInbox());
  try {
    const natsClient = await connect({
      servers: [process.env.REACT_APP_NATS_WS_SERVER || 'ws://0.0.0.0:8080'],
      token: process.env.REACT_APP_SDK_KEY,
    });
    setNatsClient(natsClient);
    const jetStream = natsClient.jetstream();
    const subscribedStream = await jetStream.subscribe(
      'apps.*.update.circuit',
      options
    );

    await (async () => {
      for await (const msg of subscribedStream) {
        const { subject } = msg;
        const data = jsonCoder.decode(msg.data);
        dispatch(reducer({ subject, data }));
      }
    })();
  } catch (err) {
    console.error(err);
  }
}
