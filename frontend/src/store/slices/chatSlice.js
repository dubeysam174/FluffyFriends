import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selectedConversation: null,
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // ✅ FIXED: Reset state properly
    clearChat: (state) => {
      state.conversations = [];
      state.selectedConversation = null;
      state.messages = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
  setLoading,
  setError,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;

// Selectors
export const selectConversations = (state) => state.chat.conversations;
export const selectSelectedConversation = (state) => state.chat.selectedConversation;
export const selectMessages = (state) => state.chat.messages;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;