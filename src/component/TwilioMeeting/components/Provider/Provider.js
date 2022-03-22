import React, { useState } from "react";

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [room, setRoom] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);

  return (
    <Context.Provider
      value={{
        room,
        localVideoTrack,
        localAudioTrack,
        setRoom,
        setLocalVideoTrack,
        setLocalAudioTrack,
      }}
    >
      {children}
    </Context.Provider>
  );
};
