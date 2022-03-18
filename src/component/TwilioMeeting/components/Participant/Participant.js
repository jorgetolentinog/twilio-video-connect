import React, { useRef } from "react";
import { useTrack } from "../../hooks/useTrack/useTrack";
import { useTrackIsEnabled } from "../../hooks/useTrackIsEnabled/useTrackIsEnabled";
import { useTrackAttach } from "../../hooks/useTrackAttach/useTrackAttach";
import style from "./Participant.module.scss";

export const Participant = ({ participant, isVideoOnly }) => {
  const videoRef = useRef();
  const audioRef = useRef();

  const track = useTrack({ participant });
  const isVideoEnabled = useTrackIsEnabled(track.videoTrack);
  const isAudioEnabled = useTrackIsEnabled(track.audioTrack);

  useTrackAttach({ track: track.videoTrack, ref: videoRef });
  useTrackAttach({ track: track.audioTrack, ref: audioRef });

  return (
    <div className={style.container}>
      <video className={style.video} ref={videoRef} />
      <div className={style.info}>
        <div>{participant.identity}</div>
        <div style={{ color: isVideoEnabled ? "lime" : "red" }}>
          video: {String(isVideoEnabled)}
        </div>
        <div style={{ color: isAudioEnabled ? "lime" : "red" }}>
          audio: {String(isAudioEnabled)}
        </div>
      </div>
      {!isVideoOnly && <audio ref={audioRef} autoPlay={true} />}
    </div>
  );
};
