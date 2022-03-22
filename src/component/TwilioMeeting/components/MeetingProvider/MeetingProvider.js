import React, { useState } from "react";

export const MeetingContext = React.createContext();

export const MeetingProvider = ({ children }) => {
  const [room, setRoom] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);

  return (
    <MeetingContext.Provider
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
    </MeetingContext.Provider>
  );
};
