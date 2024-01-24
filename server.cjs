// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

let cartItems = [];

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send the initial cartItems to the connected client
  ws.send(JSON.stringify({ cartItems }));

  ws.on('message', (message) => {
    // Handle incoming messages from clients (e.g., cart updates)
    console.log('Received message:', message);

    // Assuming the message is a request for cartItems
    if (message === 'request-cartItems') {
      // Send the cartItems as a JSON string
      const messageToSend = JSON.stringify({ cartItems });
      ws.send(messageToSend);
    } else {
      cartItems = message.toString();
    }
    // Broadcast the updated cart to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });


  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Expose the cartItems counter to the client
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Serve your Vue app (adjust the path accordingly)
app.use(express.static('dist'));

// Start the server
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});