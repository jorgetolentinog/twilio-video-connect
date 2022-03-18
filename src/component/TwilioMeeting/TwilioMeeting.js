import React, { useState } from "react";
import { Login } from "./components/Login/Login";
import { Room } from "./components/Room/Room";

export const TwilioMeeting = () => {
  const [session, setSession] = useState(null);

  const handleLogin = (session) => {
    setSession(session);
  };

  const handleLogout = (event) => {
    setSession(null);
  };

  if (!session) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <Room
      roomName={session.room}
      token={session.token}
      handleLogout={handleLogout}
    />
  );
};
