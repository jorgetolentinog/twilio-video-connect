import React, { useRef } from "react";
import { useSubscribeTrack } from "../../hooks/useSubscribeTrack/useSubscribeTrack";
import { useIsTrackEnabled } from "../../hooks/useIsTrackEnabled/useIsTrackEnabled";
import { useAttachTrack } from "../../hooks/useAttachTrack/useAttachTrack";
import { VideoIcon } from "../Icon/VideoIcon";
import { AudioIcon } from "../Icon/AudioIcon";
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
        <div className={style.infoName}>{participant.identity}</div>

        {!isVideoEnabled && (
          <div className={style.infoIndicator}>
            <VideoIcon.Disabled />
          </div>
        )}

        {!isAudioEnabled && (
          <div className={style.infoIndicator}>
            <AudioIcon.Disabled />
          </div>
        )}
      </div>
      {!isVideoOnly && <audio ref={audioRef} autoPlay={true} />}
    </div>
  );
};
