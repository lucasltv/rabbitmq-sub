"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const { QUEUE_URL } = process.env;
const q = 'hello';
// Consumer
// open
//   .then(conn => {
//     return conn.createChannel();
//   })
//   .then(ch => {
//     return ch.assertQueue(q).then(ok => {
//       return ch.consume(q, msg => {
//         if (msg !== null) {
//           console.log(msg.content.toString());
//           ch.ack(msg);
//         }
//       });
//     });
//   })
// .catch(console.warn);
//# sourceMappingURL=index.js.map