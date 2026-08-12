import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import {
  selectConversations,
  selectSelectedConversation,
  selectMessages,
  selectChatLoading,
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
  setLoading,
  setError,
} from "../store/slices/chatSlice";
import { getMyConversations, getMessages, sendMessage } from "../api/chatApi";
import { useSocket } from "../store/SocketContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Send, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const conversations = useSelector(selectConversations);
  const selectedConversation = useSelector(selectSelectedConversation);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectChatLoading);
  const { socket } = useSocket();

  const [messageInput, setMessageInput] = useState("");

  // ✅ Fetch conversations once on mount
  useEffect(() => {
    if (conversations.length === 0 && !loading) {
      fetchConversations();
    }
  }, []);

  // ✅ Listen for real-time messages
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        console.log("📨 New message:", data);
        dispatch(addMessage(data.message));
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, dispatch]);

  const fetchConversations = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMyConversations();
      console.log("💬 Full Response:", response);
      console.log("💬 Conversations:", response.conversations);

      // ✅ Extract .conversations array
      dispatch(setConversations(response.conversations || []));
    } catch (error) {
      console.error("Error fetching conversations:", error);
      dispatch(setError(error.message));
      toast.error("Failed to load conversations");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSelectConversation = async (conversation) => {
    console.log("📝 Selected Conversation:", conversation);
    dispatch(setSelectedConversation(conversation));

    try {
      dispatch(setLoading(true));
      const response = await getMessages(conversation._id);
      console.log("📬 Messages Response:", response);
      console.log("📬 Messages:", response.messages);

      // ✅ Extract .messages array
      dispatch(setMessages(response.messages || []));
    } catch (error) {
      console.error("Error fetching messages:", error);
      dispatch(setError(error.message));
      toast.error("Failed to load messages");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageInput.trim() || !selectedConversation) {
      toast.error("Select a conversation and enter a message");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await sendMessage(
        selectedConversation._id,
        messageInput
      );
      console.log("✅ Message sent:", response);

      // ✅ Emit via Socket.io for real-time
      if (socket) {
        socket.emit("sendMessage", {
          conversationId: selectedConversation._id,
          message: response.message || response,
        });
      }

      // ✅ Add to Redux
      dispatch(addMessage(response.message || response));
      setMessageInput("");
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch(setError(error.message));
      toast.error("Failed to send message");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-200px)] gap-6">
        {/* CONVERSATIONS LIST */}
        <div className="w-80 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>

          {loading && conversations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading conversations...</p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare size={40} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation._id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedConversation?._id === conversation._id
                      ? "bg-red-600 text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                  }`}
                >
                  <h3 className="font-bold">
                    {conversation.participantName || 
                     conversation.participants?.[0]?.name ||
                     "User"}
                  </h3>
                  <p className="text-sm opacity-75 truncate">
                    {conversation.lastMessage || "No messages yet"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MESSAGES SECTION */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col border border-gray-200">
          {selectedConversation ? (
            <>
              {/* HEADER */}
              <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedConversation.participantName || 
                   selectedConversation.participants?.[0]?.name ||
                   "User"}
                </h2>
                <p className="text-sm text-gray-600">Online</p>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Start a conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.sender === user._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === user._id
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p>{msg.text || msg.content}</p>  {/* ✅ FIXED: text field */}
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* INPUT FORM */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition font-semibold flex items-center gap-2"
                >
                  <Send size={18} />
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;