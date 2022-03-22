import { useEffect } from "react";

export const useAttachTrack = ({ track, ref }) => {
  useEffect(() => {
    if (!track) {
      return;
    }
    track.attach(ref.current);
    return () => track.detach();
  }, [track, ref]);
};
