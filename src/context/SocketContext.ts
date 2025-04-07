import React from "react";
import { Socket } from "socket.io-client";

export type SocketContextType = {
  socket: Socket | null;
  connected: boolean;
  initialize: () => void;
  disconnect: () => void;
};

const defaultValue: SocketContextType = {
  socket: null,
  connected: false,
  initialize: () => {},
  disconnect: () => {},
};

export const SocketContext =
  React.createContext<SocketContextType>(defaultValue);
