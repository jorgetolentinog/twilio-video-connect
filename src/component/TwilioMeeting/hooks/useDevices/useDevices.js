import { useState, useEffect } from "react";

export function useDevices() {
  const [deviceInfo, setDeviceInfo] = useState({
    audioInputDevices: [],
    videoInputDevices: [],
    audioOutputDevices: [],
    hasAudioInputDevices: false,
    hasVideoInputDevices: false,
  });

  useEffect(() => {
    const getDevices = () => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        setDeviceInfo({
          audioInputDevices: devices.filter(
            (device) => device.kind === "audioinput"
          ),
          videoInputDevices: devices.filter(
            (device) => device.kind === "videoinput"
          ),
          audioOutputDevices: devices.filter(
            (device) => device.kind === "audiooutput"
          ),
          hasAudioInputDevices: devices.some(
            (device) => device.kind === "audioinput"
          ),
          hasVideoInputDevices: devices.some(
            (device) => device.kind === "videoinput"
          ),
        });
      });
    };

    getDevices();
    navigator.mediaDevices.addEventListener("devicechange", getDevices);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
    };
  }, []);

  return deviceInfo;
}
