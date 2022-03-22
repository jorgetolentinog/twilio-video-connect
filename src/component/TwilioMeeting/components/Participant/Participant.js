import React, { useRef } from "react";
import { useSubscribeTrack } from "../../hooks/useSubscribeTrack/useSubscribeTrack";
import { useIsTrackEnabled } from "../../hooks/useIsTrackEnabled/useIsTrackEnabled";
import { useAttachTrack } from "../../hooks/useAttachTrack/useAttachTrack";
import style from "./Participant.module.scss";

export const Participant = ({ participant, isVideoOnly }) => {
  const videoRef = useRef();
  const audioRef = useRef();

  const track = useSubscribeTrack({ participant });
  const isVideoEnabled = useIsTrackEnabled(track.videoTrack);
  const isAudioEnabled = useIsTrackEnabled(track.audioTrack);

  useAttachTrack({ track: track.videoTrack, ref: videoRef });
  useAttachTrack({ track: track.audioTrack, ref: audioRef });

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
