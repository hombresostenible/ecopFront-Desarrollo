import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
// import addressReducer from './addressSlice/addressSlice';

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        user: userReducer,
        // address: addressReducer,
    },
});

export type AppDispatch = typeof store.dispatch;