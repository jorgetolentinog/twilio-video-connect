import React from "react";
import style from "./Toolbar.module.scss";
import { useSubscribeTrack } from "../../hooks/useSubscribeTrack/useSubscribeTrack";
import { useMeeting } from "../../hooks/useMeeting/useMeeting";
import { useIsTrackEnabled } from "../../hooks/useIsTrackEnabled/useIsTrackEnabled";

export const Toolbar = () => {
  const meeting = useMeeting();
  const localTrack = useSubscribeTrack({
    participant: meeting.room.localParticipant,
  });

  const isVideoEnabled = useIsTrackEnabled(localTrack.videoTrack);
  const isAudioEnabled = useIsTrackEnabled(localTrack.audioTrack);

  const trackToggle = (track) => {
    if (!track) {
      return;
    }

    if (track.isEnabled) {
      track.disable();
    } else {
      track.enable();
    }
  };

  return (
    <div className={style.container}>
      <ul>
        <li>
          <button
            style={{ background: isVideoEnabled ? "lime" : "red" }}
            onClick={() => trackToggle(localTrack.videoTrack)}
          >
            Video ({String(isVideoEnabled)})
          </button>
        </li>
        <li>
          <button
            style={{ background: isAudioEnabled ? "lime" : "red" }}
            onClick={() => trackToggle(localTrack.audioTrack)}
          >
            Audio ({String(isAudioEnabled)})
          </button>
        </li>
      </ul>
    </div>
  );
};
