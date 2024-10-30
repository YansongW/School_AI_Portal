import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AIChatMessage } from '../../types';

interface AIChatState {
  messages: AIChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: AIChatState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  'aiChat/sendMessage',
  async (message: string) => {
    // TODO: 实现AI接口调用
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return response.json();
  }
);

const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message || '发送失败';
        state.loading = false;
      });
  },
});

export const { clearMessages, addMessage } = aiChatSlice.actions;
export default aiChatSlice.reducer; 