import { useState, useEffect } from "react";

export const useParticipants = ({ room }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!room) {
      return;
    }

    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.participants.forEach(participantConnected);
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
  }, [room]);

  return participants;
};
