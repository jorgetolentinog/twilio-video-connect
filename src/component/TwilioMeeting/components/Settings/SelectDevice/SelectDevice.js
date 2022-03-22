import React, { useState, useEffect } from "react";

export const SelectDevice = ({ devices, onChangeValue }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (value == null && devices.length > 0) {
      setValue(devices[0].deviceId);
      onChangeValue(devices[0].deviceId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, devices]);

  const handleChange = (e) => {
    const deviceId = devices.find(
      (device) => device.deviceId === e.target.value
    ).deviceId;
    setValue(deviceId);
    onChangeValue(deviceId);
  };

  return (
    <select value={value} onChange={handleChange}>
      {devices.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </select>
  );
};
