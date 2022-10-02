// EXTERNAL IMPORTS
import React, { createContext, useState, useRef } from 'react';

// Context
// TO DO: Create types.
export const SocketManagerContext = createContext(undefined);

// Provider
export const SocketManagerContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [room, setRoom] = useState(undefined);
  const socketRef = useRef(undefined);

  return (
    <SocketManagerContext.Provider value={{ user, room, socketRef, setUser, setRoom }}>
      {props.children}
    </SocketManagerContext.Provider>
  );
};

// Display Name
SocketManagerContextProvider.displayName = 'SocketManagerContextProvider';
