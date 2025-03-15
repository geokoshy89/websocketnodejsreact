const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('A new client is connected');
  // Handle the incoming message
  ws.on('message', (message) => {
    console.log(`Received incoming message ${message}`);
    //Broadcast the message to all connected clients
    console.log(wss.clients.length);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        // client.send(message);
        const newMsg = `Received ${message}`;
        client.send(newMsg);
        console.log(newMsg);
      }
    });
  });
  //Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
