import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
