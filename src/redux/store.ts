import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice';
import branchReducer from './branchSlice/branchSlice';
import accountsBookReducer from './accountsBookSlice/accountsBookSlice';
import assetsBookReducer from './assetsSlice/assetsSlice';

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        user: userReducer,
        branch: branchReducer,
        accountsBook: accountsBookReducer,
        assets: assetsBookReducer,
    },
});

export type AppDispatch = typeof store.dispatch;