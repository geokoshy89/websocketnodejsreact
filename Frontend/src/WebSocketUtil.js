export const establishWebSocketConnection = () => {
  const ws = new WebSocket('ws://localhost:8080');

  //handle incoming messages
  ws.onmessage = (event) => {
    event.data.text().then((dat) => {
      console.log(`Received message: ${dat}`);
    });
  };

  //handle connection open
  ws.onopen = () => {
    console.log('Websocket connection established');
    //Perform any necessary actions when the connection is established
  };

  // Handle connection close
  ws.onclose = () => {
    console.log('WebSocket connection closed');
    // Perform any necessary actions when the connection is closed
  };

  ws.onerror = (error) => {
    console.error('Websocket error: ' + error);
    //Perform any necessary error handling
  };
  //Return the websocket instance to handle any interaction with it
  return ws;
};
