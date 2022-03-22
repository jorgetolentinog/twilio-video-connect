import React, { useEffect } from "react";
import Video from "twilio-video";
import { Participant } from "../Participant/Participant";
import { Toolbar } from "../Toolbar/Toolbar";
import { useParticipants } from "../../hooks/useParticipants/useParticipants";
import { useMeeting } from "../../hooks/useMeeting/useMeeting";
import style from "./Room.module.scss";

export const Room = ({ roomName, token, handleLogout }) => {
  const meeting = useMeeting();
  const participants = useParticipants();

  useEffect(() => {
    Video.connect(token, {
      name: roomName,
      tracks: [meeting.localVideoTrack, meeting.localAudioTrack],
    })
      .then((newRoom) => {
        meeting.setRoom(newRoom);

        window.addEventListener("beforeunload", () => {
          console.log("beforeunload");
          newRoom.disconnect();
        });
      })
      .catch((error) => {
        console.log("video connect error", { error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName, token]);

  if (!meeting.room) {
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
          <Participant participant={meeting.room.localParticipant} />
        </div>
        {remoteParticipants}
      </div>
      <Toolbar localParticipant={meeting.room.localParticipant} />
    </div>
  );
};
