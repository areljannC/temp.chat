// EXTERNAL IMPORTS
import React, { createContext, useState, useMemo, useRef } from 'react';

// Context
// TO DO: Create types.
export const SocketManagerContext = createContext(undefined);

// Provider
export const SocketManagerContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [room, setRoom] = useState(undefined);
  const socketRef = useRef<WebSocket>(undefined);

  const contextValue = useMemo(
    () => ({
      user,
      room,
      socketRef,
      setUser,
      setRoom
    }),
    [user, room]
  );

  return (
    <SocketManagerContext.Provider value={contextValue}>
      {props.children}
    </SocketManagerContext.Provider>
  );
};

// Display Name
SocketManagerContextProvider.displayName = 'SocketManagerContextProvider';
