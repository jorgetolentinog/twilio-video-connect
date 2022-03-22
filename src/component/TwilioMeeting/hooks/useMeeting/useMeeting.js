import React from "react";
import { MeetingContext } from "../../components/MeetingProvider/MeetingProvider";

export function useMeeting() {
  const context = React.useContext(MeetingContext);
  if (context == null) {
    throw new Error("Debe envolver el componente en el provider");
  }

  return context;
}
