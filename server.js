const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});


server.on('message', (msg, rinfo) => {
    console.log(rinfo)
    console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    server.send("HHHH", rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.log(`Error sending message: ${err}`);
        }
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
});

server.bind(53); 
