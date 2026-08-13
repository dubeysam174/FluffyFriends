import React, { useEffect, useState, useRef } from "react";
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
import {
  MessageSquare,
  Send,
  Search,
  MoreVertical,
  Paperclip,
} from "lucide-react";
import toast from "react-hot-toast";


const getOtherParticipant = (conversation, currentUserId) => {
  if (!conversation) return null;
  if (conversation.otherParticipant) return conversation.otherParticipant;
  if (conversation.participantName) {
    return { name: conversation.participantName };
  }
  const other = conversation.participants?.find(
    (p) => (p?._id || p) !== currentUserId
  );
  return other || null;
};

const Chat = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const conversations = useSelector(selectConversations);
  const selectedConversation = useSelector(selectSelectedConversation);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectChatLoading);
  const { socket } = useSocket();

  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false); // ✅ separate from the shared `loading` flag


  const lastUserIdRef = useRef(null);

  
  useEffect(() => {
    const previousId = lastUserIdRef.current;
    const currentId = user?._id || null;

    if (previousId && currentId && previousId !== currentId) {
      dispatch(setConversations([]));
      dispatch(setSelectedConversation(null));
      dispatch(setMessages([]));
      setMessageInput("");
    }

    lastUserIdRef.current = currentId || previousId;

    fetchConversations();
    
  }, [user?._id]);


  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      console.log("📨 New message:", data);
      dispatch(addMessage(data.message));
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, dispatch]);

  const fetchConversations = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMyConversations();
      console.log("💬 Full Response:", response);
      console.log("💬 Conversations:", response.conversations);

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
      setSending(true); // ✅ no longer blocked by unrelated fetches
      const response = await sendMessage(
        selectedConversation._id,
        messageInput
      );
      console.log("✅ Message sent:", response);

      const sentMessage = response.message || response;

      if (socket) {
        socket.emit("sendMessage", {
          conversationId: selectedConversation._id,
          message: sentMessage,
        });
      }

      dispatch(addMessage(sentMessage));
      setMessageInput("");
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch(setError(error.message));
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
   <DashboardLayout>
  <div className="flex h-[calc(100vh-160px)] min-h-[600px] gap-4">

    {/* =====================================================
        CONVERSATIONS SIDEBAR
    ====================================================== */}
    <div
      className="
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        md:w-80
        lg:w-96
      "
    >
      {/* HEADER */}
      <div className="border-b border-gray-100 p-5">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Messages
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Connect with your veterinarian
            </p>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            <MessageSquare size={18} />
          </div>
        </div>

        {/* SEARCH */}
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-3
            py-2.5
            transition
            focus-within:border-red-300
            focus-within:bg-white
          "
        >
          <Search
            size={17}
            className="flex-shrink-0 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="
              w-full
              bg-transparent
              text-sm
              text-gray-800
              outline-none
              placeholder:text-gray-400
            "
          />
        </div>
      </div>

      {/* CONVERSATIONS */}
      <div className="flex-1 overflow-y-auto p-3">

        {loading && conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div
                className="
                  mx-auto
                  mb-3
                  h-8
                  w-8
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-200
                  border-t-red-500
                "
              />

              <p className="text-sm text-gray-500">
                Loading conversations...
              </p>
            </div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center px-4">
            <div className="text-center">

              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-red-400
                "
              >
                <MessageSquare size={28} />
              </div>

              <h3 className="font-semibold text-gray-800">
                No conversations yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Start chatting with your veterinarian.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">

            {conversations.map((conversation) => {
              const other = getOtherParticipant(
                conversation,
                user?._id
              );

              const isSelected =
                selectedConversation?._id === conversation._id;

              return (
                <div
                  key={conversation._id}
                  onClick={() =>
                    handleSelectConversation(conversation)
                  }
                  className={`
                    group
                    relative
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    p-3
                    transition-all
                    duration-200

                    ${
                      isSelected
                        ? "bg-red-50"
                        : "hover:bg-gray-50"
                    }
                  `}
                >

                  {/* ACTIVE INDICATOR */}
                  {isSelected && (
                    <div
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-8
                        w-1
                        -translate-y-1/2
                        rounded-r-full
                        bg-red-500
                      "
                    />
                  )}

                  {/* AVATAR */}
                  <div className="relative flex-shrink-0">

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        text-sm
                        font-bold

                        ${
                          isSelected
                            ? "bg-red-500 text-white"
                            : "bg-red-100 text-red-500"
                        }
                      `}
                    >
                      {other?.name?.[0]?.toUpperCase() || "U"}
                    </div>

                    {/* ONLINE DOT */}
                    <span
                      className="
                        absolute
                        bottom-0
                        right-0
                        h-3.5
                        w-3.5
                        rounded-full
                        border-2
                        border-white
                        bg-green-500
                      "
                    />
                  </div>

                  {/* USER INFO */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-2">

                      <h3
                        className={`
                          truncate
                          text-sm
                          font-semibold

                          ${
                            isSelected
                              ? "text-gray-900"
                              : "text-gray-800"
                          }
                        `}
                      >
                        {other?.name || "User"}
                      </h3>

                      <span className="flex-shrink-0 text-[10px] text-gray-400">
                        {conversation.updatedAt
                          ? new Date(
                              conversation.updatedAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {conversation.lastMessage ||
                        "No messages yet"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>

    {/* =====================================================
        CHAT AREA
    ====================================================== */}
    <div
      className="
        hidden
        flex-1
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        md:flex
      "
    >

      {selectedConversation ? (
        <>
          {/* =================================================
              CHAT HEADER
          ================================================== */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100
              bg-white
              px-6
              py-4
            "
          >

            <div className="flex items-center gap-3">

              {/* AVATAR */}
              <div className="relative">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                    font-bold
                    text-red-500
                  "
                >
                  {getOtherParticipant(
                    selectedConversation,
                    user?._id
                  )?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-white
                    bg-green-500
                  "
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {getOtherParticipant(
                    selectedConversation,
                    user?._id
                  )?.name || "User"}
                </h2>

                <p className="mt-0.5 text-xs text-green-500">
                  Online
                </p>
              </div>
            </div>

            {/* MORE BUTTON */}
            <button
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-800
              "
            >
              <MoreVertical size={19} />
            </button>
          </div>

          {/* =================================================
              MESSAGES
          ================================================== */}
          <div
            className="
              flex-1
              overflow-y-auto
              bg-[#fffafa]
              px-5
              py-6
              lg:px-8
            "
          >

            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">

                <div className="text-center">

                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-red-50
                      text-red-400
                    "
                  >
                    <MessageSquare size={28} />
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    Start a conversation
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Send a message to your veterinarian.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">

                {messages.map((msg) => {

                  const senderId =
                    msg.sender?._id || msg.sender;

                  const isOwn =
                    senderId === user?._id;

                  const key =
                    msg._id ||
                    `${senderId}-${msg.createdAt}-${msg.text}`;

                  return (
                    <div
                      key={key}
                      className={`
                        flex
                        ${
                          isOwn
                            ? "justify-end"
                            : "justify-start"
                        }
                      `}
                    >

                      {/* MESSAGE */}
                      <div
                        className={`
                          max-w-[75%]
                          sm:max-w-md
                          rounded-2xl
                          px-4
                          py-3
                          shadow-sm

                          ${
                            isOwn
                              ? `
                                rounded-br-md
                                bg-red-500
                                text-white
                              `
                              : `
                                rounded-bl-md
                                border
                                border-gray-100
                                bg-white
                                text-gray-800
                              `
                          }
                        `}
                      >

                        <p className="text-sm leading-6">
                          {msg.text || msg.content}
                        </p>

                        <div
                          className={`
                            mt-1
                            text-[10px]

                            ${
                              isOwn
                                ? "text-red-100"
                                : "text-gray-400"
                            }
                          `}
                        >
                          {msg.createdAt
                            ? new Date(
                                msg.createdAt
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* =================================================
              MESSAGE INPUT
          ================================================== */}
          <div
            className="
              border-t
              border-gray-100
              bg-white
              p-4
            "
          >

            <form
              onSubmit={handleSendMessage}
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                p-2
                transition
                focus-within:border-red-300
                focus-within:bg-white
              "
            >

              {/* ATTACHMENT */}
              <button
                type="button"
                className="
                  flex
                  h-10
                  w-10
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                "
              >
                <Paperclip size={19} />
              </button>

              {/* INPUT */}
              <input
                type="text"
                value={messageInput}
                onChange={(e) =>
                  setMessageInput(e.target.value)
                }
                placeholder="Type a message..."
                className="
                  flex-1
                  bg-transparent
                  px-2
                  text-sm
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                "
                disabled={sending}
              />

              {/* SEND */}
              <button
                type="submit"
                disabled={sending || !messageInput.trim()}
                className="
                  flex
                  h-10
                  w-10
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-red-600
                  hover:scale-105
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Send size={17} />
              </button>
            </form>
          </div>
        </>
      ) : (
        /* =================================================
           NO CONVERSATION SELECTED
        ================================================== */
        <div className="flex h-full items-center justify-center bg-[#fffafa]">

          <div className="max-w-sm px-6 text-center">

            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-red-400
              "
            >
              <MessageSquare size={34} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Your Conversations
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Select a conversation from the left to start
              chatting with your veterinarian.
            </p>

            <div
              className="
                mx-auto
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-red-50
                px-4
                py-2
                text-xs
                font-medium
                text-red-500
              "
            >
              🐾 We're here to help your pet
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</DashboardLayout>
  );
};

export default Chat;