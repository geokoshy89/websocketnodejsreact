import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { establishWebSocketConnection } from './WebSocketUtil';

export const WebSocketPage = () => {
  const [msg, setMsg] = useState('');
  const [reply, setReply] = useState('');
  const [reconnect, setReconnect] = useState(0);
  const websocket = useRef(null);
  function handleClick(event) {
    console.log('Send message ' + msg);
    if (
      !websocket.current ||
      websocket.current.readyState === WebSocket.CLOSED
    ) {
      setReconnect((current) => current + 1);
      setTimeout(() => websocket.current.send(msg), 300);
      return;
    }
    websocket.current.send(msg);
  }

  function handleMessageChange(event) {
    setMsg(event.target.value);
  }

  useEffect(() => {
    if (
      !websocket.current ||
      websocket.current.readyState === WebSocket.CLOSED
    ) {
      websocket.current = establishWebSocketConnection();
      websocket.current.onmessage = (event) => {
        setReply(event.data);
      };
    }

    return () => {
      if (
        websocket.current &&
        websocket.current.readyState === WebSocket.OPEN
      ) {
        websocket.current.close();
        websocket.current = null;
      }
    };
  }, [reconnect]);

  return (
    <div>
      <label htmlFor="msg">Message: </label>
      <input
        type="text"
        id="msg"
        value={msg}
        onChange={handleMessageChange}
      ></input>
      <button type="button" onClick={handleClick}>
        Send Message
      </button>
      <p>Reply from server is : {reply}</p>
    </div>
  );
};
