import React from "react";
import style from "./Toolbar.module.scss";
import { useTrack } from "../../hooks/useTrack/useTrack";
import { useTrackIsEnabled } from "../../hooks/useTrackIsEnabled/useTrackIsEnabled";

export const Toolbar = ({ localParticipant }) => {
  const localTrack = useTrack({ participant: localParticipant });

  const isVideoEnabled = useTrackIsEnabled(localTrack.videoTrack);
  const isAudioEnabled = useTrackIsEnabled(localTrack.audioTrack);

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
          <button onClick={() => trackToggle(localTrack.videoTrack)}>
            Video ({String(isVideoEnabled)})
          </button>
        </li>
        <li>
          <button onClick={() => trackToggle(localTrack.audioTrack)}>
            Audio ({String(isAudioEnabled)})
          </button>
        </li>
      </ul>
    </div>
  );
};
