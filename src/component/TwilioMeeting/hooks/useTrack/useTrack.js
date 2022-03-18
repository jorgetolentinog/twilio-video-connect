import { useState, useEffect } from "react";

export const useTrack = ({ participant }) => {
  const [videoTrack, setVideoTrack] = useState();
  const [audioTrack, setAudioTrack] = useState();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const videoTracks = trackpubsToTracks(participant.videoTracks);
    const audioTracks = trackpubsToTracks(participant.audioTracks);

    if (videoTracks.length > 0) {
      setVideoTrack(videoTracks[0]);
    }

    if (audioTracks.length > 0) {
      setAudioTrack(audioTracks[0]);
    }

    participant.on("trackSubscribed", (track) => {
      if (track.kind === "video") {
        setVideoTrack(track);
      } else {
        setAudioTrack(track);
      }
    });

    participant.on("trackUnsubscribed", (track) => {
      if (track.kind === "video") {
        setVideoTrack(null);
      } else {
        setAudioTrack(null);
      }
    });

    return () => {
      setVideoTrack(null);
      setAudioTrack(null);
      participant.removeAllListeners();
    };
  }, [participant]);

  return { videoTrack, audioTrack };
};
