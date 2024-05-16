import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountsBook } from '../../types/User/accountsBook.types';

interface UserState {
    accountsBook: IAccountsBook | IAccountsBook[] | null;
    loading: boolean;
    errorAccountsBook: string[] | null;
}

const initialState: UserState = {
    accountsBook: null,
    loading: false,
    errorAccountsBook: null,
};

const branchSlice = createSlice({
    name: 'accountsBook',
    initialState,
    reducers: {
        //ACTIONS
        accountsBookData: (state, action: PayloadAction<IAccountsBook | null>) => {
            state.loading = false;
            state.accountsBook = action.payload;
        },
        errorAccountsBook: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorAccountsBook = action.payload;
        },
        postAccountsBookStart: (state, action: PayloadAction<IAccountsBook  | null>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;        // Limpia cualquier error previo
        },
        getAccountsBooksStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBookStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = false;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        putAccountsBookStart: (state) => {
            state.loading = true;
            state.errorAccountsBook = null;
        },
        deleteAccountsBookStart: (state) => {
            state.loading = true;
            state.errorAccountsBook = null;
        },
    },
});

export const { accountsBookData, errorAccountsBook, postAccountsBookStart, getAccountsBooksStart, getAccountsBookStart, putAccountsBookStart, deleteAccountsBookStart } = branchSlice.actions;
export default branchSlice.reducer;