import React from "react";
import style from "./Toolbar.module.scss";
import { useSubscribeTrack } from "../../hooks/useSubscribeTrack/useSubscribeTrack";
import { useMeeting } from "../../hooks/useMeeting/useMeeting";
import { useIsTrackEnabled } from "../../hooks/useIsTrackEnabled/useIsTrackEnabled";
import { AudioIcon } from "../Icon/AudioIcon";
import { VideoIcon } from "../Icon/VideoIcon";

export const Toolbar = ({ visible }) => {
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

  const classes = [style.content];
  if (visible) {
    classes.push(style.contentVisible);
  }

  return (
    <div className={classes.join(" ")}>
      <ul className={style.menu}>
        <li>
          <button
            className={style.button}
            onClick={() => trackToggle(localTrack.videoTrack)}
          >
            {isVideoEnabled ? <VideoIcon.Enabled /> : <VideoIcon.Disabled />}
          </button>
        </li>
        <li>
          <button
            className={style.button}
            onClick={() => trackToggle(localTrack.audioTrack)}
          >
            {isAudioEnabled ? <AudioIcon.Enabled /> : <AudioIcon.Disabled />}
          </button>
        </li>
      </ul>
    </div>
  );
};
