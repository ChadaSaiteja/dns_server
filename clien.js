const dgram = require('dgram');
const message = Buffer.from('your_dns_query');
const client = dgram.createSocket('udp4');

client.send(message, 0, message.length, 4153, '127.0.0.1', (err) => {
  if (err) console.error(err);
  else console.log('Query sent!');
});

client.on('message', (msg) => {
  console.log('Response:', msg.toString());
  client.close();
});
