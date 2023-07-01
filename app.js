const peers = ['peer1', 'peer2', 'peer3','peer4','peer5']; // IDs for your three peers
const connections = {}; // Store connections
let peer; // Declare peer object
let isValidator = false; // Flag to identify the validator peer

window.addEventListener('load', () => {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js';
  script.onload = initializePeer;
  document.body.appendChild(script);
});

function initializePeer() {
  const peerId = peers[Math.floor(Math.random() * peers.length)];
  peer = new Peer(peerId, {
    host: 'localhost',
    port: 9000,
    path: '/myapp',
  });

  peer.on('open', (id) => {
    console.log(`Peer ID: ${id}`);
    if (id === 'validator') {
      isValidator = true;
      console.log('This peer is the validator.');
    }
    connectToPeers(id); // Pass the generated Peer ID to the function
  });

  peer.on('connection', (conn) => {
    connections[conn.peer] = conn;
    console.log(`Peer connected: ${conn.peer}`);
  });
}

function connectToPeers(peerId) {
  peers.forEach((p) => {
    if (p !== peerId) {
      const conn = peer.connect(p);
      connections[p] = conn;
    }
  });
}

// Function to check if all peers are connected
function checkAllPeersConnected() {
  const allPeersConnected = peers.every((p) => connections[p]);
  if (allPeersConnected) {
    console.log('All peers connected.');
    if (isValidator) {
      // Perform validation-specific logic here
      console.log('Validator-specific logic.');
    } else {
      // Perform non-validator logic here
      console.log('Non-validator-specific logic.');
    }
  } else {
    setTimeout(checkAllPeersConnected, 1000); // Check again after 1 second
  }
}

// Call the function to check if all peers are connected
checkAllPeersConnected();
