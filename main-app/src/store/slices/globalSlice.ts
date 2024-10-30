import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
  loading: boolean;
  loadingText?: string;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  }>;
}

const initialState: GlobalState = {
  loading: false,
  loadingText: undefined,
  notifications: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
      state.loadingText = action.payload.text;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
  },
});

export const { setLoading, addNotification, removeNotification } = globalSlice.actions;
export default globalSlice.reducer; 