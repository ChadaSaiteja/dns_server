const dgram = require("dgram");
const dns_packet = require("dns-packet");
const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.log(`Server error:\n${err.stack}`);
  server.close();
});


//get list from redis or store details in db
const domainsList = {
  "example.com": "0.0.0.1",
  "google.com": "0.0.0.1",
};

server.on("message", (msg, rinfo) => {
  const record = dns_packet.decode(msg);
  const domain = record.questions[0].name;
  console.log(record.questions);
  console.log(rinfo);

  const response = dns_packet.encode({
    type: "response",
    id: record.id,
    questions: record.questions,
    answers: [
      {
        name: domain,
        type: "A",
        class: "IN",
        ttl: 300,
        data: domainsList[domain] ?? "0.0.0.0",
      },
    ],
  });
  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.log(`Error sending message: ${err}`);
    }
  });
});

server.on("listening", () => {
  const address = server.address();
  console.log(`Server listening ${address.address}:${address.port}`);
});

server.bind(4153);
