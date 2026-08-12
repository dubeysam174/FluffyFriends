import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const user = useSelector(selectUser);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

 useEffect(() => {
  if (!user?._id) return;

  const newSocket = io("http://localhost:8080", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    auth: { userId: user._id }, // send identity at handshake, not just after connect
  });

  newSocket.on("connect", () => {
    console.log("✅ Socket connected:", newSocket.id);
    newSocket.emit("join", { userId: user._id, userRole: user.role });
    setIsConnected(true);
  });

  newSocket.on("receiveMessage", (data) => {
    console.log("📨 New message:", data);
  });

  newSocket.on("userOnline", (data) => {
    console.log("👤 User online:", data);
  });

  newSocket.on("connect_error", (error) => {
    console.error("❌ Socket error:", error);
    setIsConnected(false);
  });

  newSocket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
    setIsConnected(false);
  });

  setSocket(newSocket);

  return () => {
    // ✅ explicitly tell the server this user's socket is leaving
    // before tearing down, so it can't still be in old rooms
    newSocket.emit("leave", { userId: user._id });
    newSocket.removeAllListeners();
    newSocket.close();
    setSocket(null);
    setIsConnected(false);
  };
}, [user?._id]); // ✅ key off the id, not the object reference

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};