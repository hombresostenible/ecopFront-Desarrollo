import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountsBook } from '../../../types/User/accountsBook.types';

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

const accountsBookSlice = createSlice({
    name: 'accountsBook',
    initialState,
    reducers: {
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
            state.errorAccountsBook = null;
        },
        getAccountsBooksStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBooksApprovedStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBooksIncomesStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBooksIncomesApprovedByBranchStart: (state, action: PayloadAction<IAccountsBook[]>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBooksExpensesStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBookByIdStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = false;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getAccountsBookByBranchStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = false;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getIncomesNotApprovedStart: (state, action: PayloadAction<IAccountsBook>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        getIncomesNotApprovedByBranchStart: (state, action: PayloadAction<IAccountsBook[]>) => {
            state.loading = true;
            state.accountsBook = action.payload;
            state.errorAccountsBook = null;
        },
        patchIncomesNotApprovedStart: (state) => {
            state.loading = true;
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

export const { accountsBookData, errorAccountsBook, postAccountsBookStart, getAccountsBooksStart, getAccountsBooksApprovedStart, getAccountsBooksIncomesStart, getAccountsBooksIncomesApprovedByBranchStart, getAccountsBooksExpensesStart, getAccountsBookByIdStart, getAccountsBookByBranchStart, getIncomesNotApprovedStart, getIncomesNotApprovedByBranchStart, patchIncomesNotApprovedStart, putAccountsBookStart, deleteAccountsBookStart } = accountsBookSlice.actions;
export default accountsBookSlice.reducer;