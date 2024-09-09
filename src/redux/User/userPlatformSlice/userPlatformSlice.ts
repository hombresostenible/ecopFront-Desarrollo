import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserPlatform } from '../../../types/User/userPlatform.types';

interface UserPlatformState {
    userPlatform: IUserPlatform | IUserPlatform[] | null;
    loading: boolean;
    errorUserPlatform: string[] | null;
}

const initialState: UserPlatformState = {
    userPlatform: null,
    loading: false,
    errorUserPlatform: null,
};

const userPlatformSlice = createSlice({
    name: 'userPlatform',
    initialState,
    reducers: {
        userPlatformData: (state, action: PayloadAction<IUserPlatform | null>) => {
            state.loading = false;
            state.userPlatform = action.payload;
        },
        errorUserPlatform: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorUserPlatform = action.payload;
        },
        postUserPlatformStart: (state, action: PayloadAction<IUserPlatform  | null>) => {
            state.loading = true;
            state.userPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        postManyUsersPlatformStart: (state, action: PayloadAction<IUserPlatform[]>) => {
            state.loading = true;
            state.userPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        getUsersPlatformStart: (state, action: PayloadAction<IUserPlatform>) => {
            state.loading = true;
            state.userPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        getUserPlatformByIdStart: (state, action: PayloadAction<IUserPlatform>) => {
            state.loading = false;
            state.userPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        getUserPlatformsByBranchStart: (state, action: PayloadAction<IUserPlatform[]>) => {
            state.loading = true;
            state.userPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        putUserPlatformStart: (state) => {
            state.loading = true;
            state.errorUserPlatform = null;
        },
        putManyUsersPlatformStart: (state, action: PayloadAction<IUserPlatform[]>) => {
            state.loading = true;
            state.userPlatform = action.payload;
            state.errorUserPlatform = null;
        },
        deleteUserPlatformStart: (state) => {
            state.loading = true;
            state.errorUserPlatform = null;
        },
    },
});

export const { userPlatformData, errorUserPlatform, postUserPlatformStart, postManyUsersPlatformStart, getUsersPlatformStart, getUserPlatformByIdStart, getUserPlatformsByBranchStart, putUserPlatformStart, putManyUsersPlatformStart, deleteUserPlatformStart } = userPlatformSlice.actions;
export default userPlatformSlice.reducer;