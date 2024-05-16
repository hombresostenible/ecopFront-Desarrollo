import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAssets } from '../../types/User/assets.types';

interface UserState {
    assets: IAssets | IAssets[] | null;
    loading: boolean;
    errorAssets: string[] | null;
}

const initialState: UserState = {
    assets: null,
    loading: false,
    errorAssets: null,
};

const branchSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        //ACTIONS
        assetsData: (state, action: PayloadAction<IAssets | null>) => {
            state.loading = false;
            state.assets = action.payload;
        },
        errorAssets: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorAssets = action.payload;
        },
        postAssetStart: (state, action: PayloadAction<IAssets  | null>) => {
            state.loading = true;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        postManyAssetsStart: (state, action: PayloadAction<IAssets[]>) => {
            state.loading = true;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        getAssetsStart: (state, action: PayloadAction<IAssets>) => {
            state.loading = true;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        getAssetStart: (state, action: PayloadAction<IAssets>) => {
            state.loading = false;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        getAssetsByBranchStart: (state, action: PayloadAction<IAssets[]>) => {
            state.loading = true;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        putAssetStart: (state) => {
            state.loading = true;
            state.errorAssets = null;
        },
        putManyAssetsStart: (state, action: PayloadAction<IAssets[]>) => {
            state.loading = true;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        patchAssetStart: (state) => {
            state.loading = true;
            state.errorAssets = null;
        },
        deleteAssetStart: (state) => {
            state.loading = true;
            state.errorAssets = null;
        },
    },
});

export const { assetsData, errorAssets, postAssetStart, postManyAssetsStart, getAssetsStart, getAssetStart, getAssetsByBranchStart, putAssetStart, putManyAssetsStart, patchAssetStart, deleteAssetStart } = branchSlice.actions;
export default branchSlice.reducer;