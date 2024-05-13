import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import branchReducer from './branchSlice/branchSlice';

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        user: userReducer,
        branch: branchReducer,
    },
});

export type AppDispatch = typeof store.dispatch;