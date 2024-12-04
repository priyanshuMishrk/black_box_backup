import React, { createContext, useEffect } from 'react';
import socket from '../socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.connect(); // Connect to the server when the app mounts

    // Clean up the socket connection when the app unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
