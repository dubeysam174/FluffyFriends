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
    const response = await API.get(`/chat/messages/${conversationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (conversationId, message) => {
  try {
    const response = await API.post(`/chat/send-message`, {
      conversationId,
      message,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startConversation = async (vetId) => {
  try {
    const response = await API.post(`/chat/start-conversation`, {
      participantId: vetId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};