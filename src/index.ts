import * as dotenv from 'dotenv';
import * as amqp from 'amqplib';
import {ConsumeMessage} from 'amqplib';

dotenv.config();

const {QUEUE_URL} = process.env;
const q = 'hello';

async function consumer() {
  try {
    const conn = await amqp.connect(QUEUE_URL);
    const ch = await conn.createChannel();
    ch.consume(q, handler, {noAck: true});
  } catch (error) {
    console.warn(error);
  }
}
consumer();

async function handler(msg: ConsumeMessage) {
  if (msg !== null) {
    console.log(
      `Message received (PID ${process.pid}): ${msg.content.toString()}`
    );
  }
}
