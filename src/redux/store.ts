import { configureStore } from '@reduxjs/toolkit';
import contactUsReducer from './contactUs/contactUsSlice';

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = {
    contactUs: contactUsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;