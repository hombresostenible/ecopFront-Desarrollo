import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types/User/user.types';

interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string[] | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //SON LOS ESTADOS
        userData: (state, action: PayloadAction<IUser | null>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        userErrors: (state, action: PayloadAction<string[]>) => {
            state.loading = true;
            state.error = action.payload;
        },
        registerUserStart: (state, action: PayloadAction<IUser | null>) => {
            state.loading = true;
            state.user = action.payload;
            state.error = null;
        },
        isAuthenticatedStatus: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        loginStart: (state, action: PayloadAction<IUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        profileStart: (state, action: PayloadAction<IUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        sendEmailPasswordChangeRequest: (state) => {
            state.loading = false;
            state.error = null;
        },
        passwordChange: (state) => {
            state.loading = false;
            state.error = null;
        },
        accountUnlocking: (state) => {
            state.loading = false;
            state.error = null;
        },
        logoChange: (state, action: PayloadAction<IUser>) => {
            state.loading = false;
            state.user = action.payload;
        },
        deleteLogo: (state) => {
            state.loading = false;
        },
    },
});

export const { userData, userErrors, registerUserStart, isAuthenticatedStatus, loginStart, profileStart, sendEmailPasswordChangeRequest, passwordChange, accountUnlocking, logoChange, deleteLogo } = userSlice.actions;
export default userSlice.reducer;