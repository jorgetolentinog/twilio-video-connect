import React from "react";
import { Context } from "../../components/Provider/Provider";

export function useMeeting() {
  const context = React.useContext(Context);
  if (context == null) {
    throw new Error("Debe envolver el componente en el provider");
  }

  return context;
}
