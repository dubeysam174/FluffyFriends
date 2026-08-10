import { createSlice } from "@reduxjs/toolkit";


const initialState={
    conversations:[],
    selectedConversation: null,
    messages: [],
    loading: false,
    error: null,
}


const chatSlice = createSlice({
    name:'Chat',
    initialState,
    reducers:{
        setConversations: (state,action)=>{
            state.conversations= action.payload;
        },
        setSelectedConversation:(state,action)=>{
            state.selectedConversation=action.payload;
        },
        setMessages: (state,action)=>{
            state.messages.push(action.payload);
        },
        setLoading:(state,action)=>{
            state.loading= action.payload;
        },
        setError:(state,action)=>{
            state.error=action.payload;
        },
        clearChat:()=>initialState,
    }
})
// selectors...

export const selectConversations = (state) => state.chat.conversations;
export const selectSelectedConversation = (state) => state.chat.selectedConversation;
export const selectMessages = (state) => state.chat.messages;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;