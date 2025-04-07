import React from "react";
import { SocketContext } from "./SocketContext";
import { getConfigs } from "../utils/common";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

export function SocketProvider({ children }: React.PropsWithChildren) {
  const { token } = useAuth();
  const socketRef = React.useRef<Socket | null>(null);
  const [connected, setConnected] = React.useState(false);

  const initialize = React.useCallback(() => {
    if (socketRef.current) {
      return;
    }

    const SOCKET_URL = `${getConfigs("VITE_API_URL")}`;
    const socket = io(SOCKET_URL, {
      auth: {
        token,
      },
    });

    // TODO: Handle connection errors
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });
    socketRef.current = socket;
  }, [token]);

  const disconnect = React.useCallback(() => {
    if (socketRef.current?.connected) {
      socketRef.current.disconnect();
    }
  }, []);

  const value = React.useMemo(
    () => ({ socket: socketRef.current, connected, initialize, disconnect }),
    [connected, initialize, disconnect]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
