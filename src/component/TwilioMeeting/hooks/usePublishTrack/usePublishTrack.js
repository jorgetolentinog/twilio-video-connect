import { useMeeting } from "../useMeeting/useMeeting";

export const usePublishTrack = () => {
  const meeting = useMeeting();

  const publishTrack = ({ oldTrack, newTrack }) => {
    if (!meeting.room) {
      return;
    }

    if (oldTrack) {
      meeting.room.localParticipant.unpublishTrack(oldTrack);
      meeting.room.localParticipant.emit("trackUnsubscribed", oldTrack);
    }

    meeting.room.localParticipant.publishTrack(newTrack);
    meeting.room.localParticipant.emit("trackSubscribed", newTrack);
  };

  return publishTrack;
};
