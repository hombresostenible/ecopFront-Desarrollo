import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBranch } from '../../../types/User/branch.types';

interface BranchState {
    branch: IBranch | IBranch[] | null;
    loading: boolean;
    errorBranch: string[] | null;
}

const initialState: BranchState = {
    branch: null,
    loading: false,
    errorBranch: null,
};

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        formData: (state, action: PayloadAction<IBranch[] | null>) => {
            state.loading = false;
            state.branch = action.payload;
        },
        errorBranch: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorBranch = action.payload;
        },
        postBranchStart: (state) => {
            state.loading = true;
            state.errorBranch = null;
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
        getBranchByIdStart: (state, action: PayloadAction<IBranch>) => {
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

export const { formData, errorBranch, postBranchStart, postManyBranchesStart, getBranchesStart, getBranchByIdStart, putBranchStart, deleteBranchStart } = branchSlice.actions;
export default branchSlice.reducer;