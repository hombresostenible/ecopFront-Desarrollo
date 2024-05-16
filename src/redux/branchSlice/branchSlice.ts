import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBranch } from '../../types/User/branch.types';

interface UserState {
    branch: IBranch | IBranch[] | null;
    loading: boolean;
    errorBranch: string[] | null;
}

const initialState: UserState = {
    branch: null,
    loading: false,
    errorBranch: null,
};

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        //ACTIONS
        branchData: (state, action: PayloadAction<IBranch | null>) => {
            state.loading = false;
            state.branch = action.payload;
        },
        errorBranch: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorBranch = action.payload;
        },
        postBranchStart: (state, action: PayloadAction<IBranch  | null>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null;        // Limpia cualquier error previo
        },
        postManyBranchesStart: (state, action: PayloadAction<IBranch[]>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        getBranchesStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        getBranchStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = false;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        putBranchStart: (state) => {
            state.loading = true;
            state.errorBranch = null;
        },
        deleteBranchStart: (state) => {
            state.loading = true;
            state.errorBranch = null;
        },
    },
});

export const { branchData, errorBranch, postBranchStart, postManyBranchesStart, getBranchesStart, getBranchStart, putBranchStart, deleteBranchStart } = branchSlice.actions;
export default branchSlice.reducer;