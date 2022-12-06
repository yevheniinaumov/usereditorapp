import { configureStore } from '@reduxjs/toolkit';
import userIndexReducer from '../features/users/userIndexSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    user: userIndexReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
