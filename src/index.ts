import * as dotenv from 'dotenv';
import * as amqp from 'amqplib';

dotenv.config();

const {QUEUE_URL} = process.env;
const q = 'hello';

async function consumer() {
  try {
    const conn = await amqp.connect(QUEUE_URL);
    const ch = await conn.createChannel();
    ch.consume(
      q,
      async msg => {
        if (msg !== null) {
          console.log(
            `Message received (PID ${process.pid}): ${msg.content.toString()}`
          );
          await sleep(2e3);
          ch.ack(msg);
        }
      },
      {
        // automatic acknowledgment mode,
        // see https://www.rabbitmq.com/confirms.html for details
        noAck: true,
      }
    );
  } catch (error) {
    console.warn(error);
  }
}
consumer();

async function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
