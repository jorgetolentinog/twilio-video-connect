import React, { Component } from "react";
import { TwilioMeeting } from "./component/TwilioMeeting/TwilioMeeting";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Meeting</h1>
        <TwilioMeeting />
      </div>
    );
  }
}
