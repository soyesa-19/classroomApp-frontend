import React from "react";
import { SocketContext } from "../context/SocketContext";

export function useSocket() {
  return React.useContext(SocketContext);
}
