import { useEffect } from "react";

export const useTrackAttach = ({ track, ref }) => {
  useEffect(() => {
    if (!track) {
      return;
    }
    track.attach(ref.current);
    return () => track.detach();
  }, [track, ref]);
};
