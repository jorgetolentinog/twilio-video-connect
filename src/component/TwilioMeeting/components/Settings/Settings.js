import React, { useRef } from "react";
import { useDevices } from "../../hooks/useDevices/useDevices";
import { useMeeting } from "../../hooks/useMeeting/useMeeting";
import { usePublishTrack } from "../../hooks/usePublishTrack/usePublishTrack";
import Video from "twilio-video";
import style from "./Settings.module.scss";
import { SelectDevice } from "./SelectDevice/SelectDevice";

export const Settings = () => {
  const deviceInfo = useDevices();
  const meeting = useMeeting();
  const videoRef = useRef();
  const publishTrack = usePublishTrack();

  const handleChangeVideoInputDevice = (deviceId) => {
    Video.createLocalVideoTrack({
      width: 1280,
      height: 720,
      frameRate: 24,
      name: `camera-${Date.now()}`,
      deviceId: deviceId,
    }).then((newTrack) => {
      newTrack.attach(videoRef.current);

      if (meeting.room) {
        publishTrack({
          oldTrack: meeting.localVideoTrack,
          newTrack: newTrack,
        });
      }

      meeting.setLocalVideoTrack(newTrack);
    });
  };

  const handleChangeAudioInputDevice = (deviceId) => {
    Video.createLocalAudioTrack({
      deviceId: meeting.audioInputDeviceId,
    }).then((newTrack) => {
      newTrack.disable();
      meeting.setLocalAudioTrack(newTrack);
    });
  };

  return (
    <div className={style.container}>
      <div className={style.media}>
        <div className={style.camera}>
          <video ref={videoRef} />
        </div>
      </div>
      <div className={style.form}>
        <div className={style.formField}>
          <div>Dispositivo de entrada de video</div>
          <SelectDevice
            devices={deviceInfo.videoInputDevices}
            onChangeValue={handleChangeVideoInputDevice}
          />
        </div>

        <div className={style.formField}>
          <div>Dispositivo de entrada de audio</div>
          <SelectDevice
            devices={deviceInfo.audioInputDevices}
            onChangeValue={handleChangeAudioInputDevice}
          />
        </div>
      </div>
    </div>
  );
};
