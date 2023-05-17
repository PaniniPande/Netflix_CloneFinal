import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // Use 'user' as the key instead of 'counter'
  },
});

