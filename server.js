const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: 9000,
  path: '/myapp', // Customize the path as per your needs
});