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
    if (!user) return;

    const newSocket = io("http://localhost:8080", {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // ✅ Connection event
    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
      newSocket.emit("join", { userId: user._id, userRole: user.role });
      setIsConnected(true);
    });

    // ✅ Listen for incoming messages
    newSocket.on("receiveMessage", (data) => {
      console.log("📨 New message:", data);
      // Handle in Chat.jsx via addMessage action
    });

    // ✅ Listen for user online status
    newSocket.on("userOnline", (data) => {
      console.log("👤 User online:", data);
    });

    // ✅ Error handling
    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket error:", error);
      setIsConnected(false);
    });

    // ✅ Disconnect event
    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user]);

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