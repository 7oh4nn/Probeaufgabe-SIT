// server.mjs
import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

let cartItems = [];

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Handle incoming messages from clients (e.g., cart updates)
    // Assuming the message is a request for cartItems
    if (message.toString() === 'request-cartItems') {
      console.log('Received request:', message.toString());
      // Send the cartItems as a JSON string
      const messageToSend = JSON.stringify({ cartItems });
      ws.send(messageToSend);
    } else {
      console.log('Received cart item IDs:', message.toString());
      cartItems = JSON.parse(message);

      // Broadcast the updated cart to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ cartItems }));
        }
      });
    }
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