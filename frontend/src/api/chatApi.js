import API from "./axios";

export const getMyConversations = async () => {
  try {
    const response = await API.get("/chat/conversations");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (conversationId) => {
  try {
    // ✅ FIXED: /:conversationId/messages
    const response = await API.get(`/chat/${conversationId}/messages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (conversationId, message) => {
  try {
    const response = await API.post(`/chat/${conversationId}/message`, {
      text: message,  // ✅ CHANGED: "message" → "text"
      type: "text",
      fileUrl: ""
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startConversation = async (vetId) => {
  try {
    // ✅ FIXED: /start
    const response = await API.post(`/chat/start`, {
      participantId: vetId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};