const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Read the certificate and private key
const options = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.crt')),
    requestCert: true,
    // Do not reject clients automatically
    rejectUnauthorized: false
};

// Create a TLS server
const server = tls.createServer(options, (socket) => {
    console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');

    socket.on('data', (data) => {
        console.log('Received data:', data.toString());
        socket.write(`Echo: ${data}`);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.write('Welcome to the TLS server!\n');
});

// Listen on port 6467
const PORT = 6467;
server.listen(PORT, () => {
    console.log(`TLS server is listening on port ${PORT}`);
});
