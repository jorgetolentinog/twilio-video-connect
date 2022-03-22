import React, { useState } from "react";
import { Login } from "./components/Login/Login";
import { Room } from "./components/Room/Room";
import { Settings } from "./components/Settings/Settings";
import { Provider } from "./components/Provider/Provider";

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
    <Provider>
      <Settings />
      {content}
    </Provider>
  );
};
