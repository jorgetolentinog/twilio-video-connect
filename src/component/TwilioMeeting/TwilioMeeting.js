import React, { useState } from "react";
import { Login } from "./components/Login/Login";
import { Room } from "./components/Room/Room";
import { Settings } from "./components/Settings/Settings";
import { MeetingProvider } from "./components/MeetingProvider/MeetingProvider";

export const TwilioMeeting = () => {
  const [session, setSession] = useState(null);

  const handleLogin = (session) => {
    setSession(session);
  };

  const handleLogout = (event) => {
    setSession(null);
  };

  const content = !session ? (
    <Login handleLogin={handleLogin} />
  ) : (
    <Room
      roomName={session.room}
      token={session.token}
      handleLogout={handleLogout}
    />
  );

  return (
    <MeetingProvider>
      <Settings />
      {content}
    </MeetingProvider>
  );
};
