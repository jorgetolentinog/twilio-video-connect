import React, { useState } from "react";
import style from "./Login.module.scss";

export const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("asd");
  const [roomName, setRoomName] = useState("prueba");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await fetch("/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (handleLogin) {
      handleLogin({
        room: roomName,
        token: data.token,
      });
    }
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="room">Room:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};
