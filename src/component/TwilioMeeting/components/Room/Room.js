import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import { Participant } from "../Participant/Participant";
import { Toolbar } from "../Toolbar/Toolbar";
import { useParticipants } from "../../hooks/useParticipants/useParticipants";
import style from "./Room.module.scss";

export const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState();
  const participants = useParticipants({ room });

  useEffect(() => {
    Video.connect(token, {
      name: roomName,
      audio: false,
      video: true,
    })
      .then((newRoom) => {
        setRoom(newRoom);
      })
      .catch((error) => {
        console.log("video connect error", { error });
      });
  }, [roomName, token]);

  if (!room) {
    return <div>Loading...</div>;
  }

  const remoteParticipants = participants.map((participant) => (
    <div key={participant.sid} className={style.layoutItem}>
      <Participant participant={participant} />
    </div>
  ));

  return (
    <div className={style.container}>
      <div className={style.layout}>
        <div className={style.layoutItem}>
          <Participant participant={room.localParticipant} />
        </div>
        {remoteParticipants}
      </div>
      <Toolbar localParticipant={room.localParticipant} />
    </div>
  );
};
