import * as dotenv from 'dotenv';
import * as amqp from 'amqplib';

dotenv.config();

const {QUEUE_URL} = process.env;
const q = 'hello';

async function consumer() {
  try {
    const conn = await amqp.connect(QUEUE_URL);
    const ch = await conn.createChannel();
    ch.consume(q, msg => {
      if (msg !== null) {
        console.log(
          `Message received (PID ${process.pid}): ${msg.content.toString()}`
        );
        ch.ack(msg);
      }
    });
  } catch (error) {
    console.warn(error);
  }
}
consumer();
