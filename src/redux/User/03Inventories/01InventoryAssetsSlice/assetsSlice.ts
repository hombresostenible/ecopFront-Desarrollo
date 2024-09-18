import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAssets } from '../../../../types/User/assets.types';

interface AssetState {
    assets: IAssets | IAssets[] | null;
    assetsOff: IAssets | IAssets[] | null;
    loading: boolean;
    errorAssets: string[] | null;
}

const initialState: AssetState = {
    assets: null,
    assetsOff: null,
    loading: false,
    errorAssets: null,
};

const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
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
        getAssetByIdStart: (state, action: PayloadAction<IAssets>) => {
            state.loading = false;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        getAssetsByBranchStart: (state, action: PayloadAction<IAssets[]>) => {
            state.loading = true;
            state.assets = action.payload;
            state.errorAssets = null;
        },
        getAssetsOffStart: (state, action: PayloadAction<IAssets[]>) => {
            state.loading = true;
            state.assetsOff = action.payload;
            state.errorAssets = null;
        },
        getAssetsOffByBranchStart: (state, action: PayloadAction<IAssets[]>) => {
            state.loading = true;
            state.assetsOff = action.payload;
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
        patchAddInventoryAssetStart: (state) => {
            state.loading = true;
            state.errorAssets = null;
        },
        deleteAssetStart: (state) => {
            state.loading = true;
            state.errorAssets = null;
        },
    },
});

export const { assetsData, errorAssets, postAssetStart, postManyAssetsStart, getAssetsStart, getAssetByIdStart, getAssetsByBranchStart, getAssetsOffStart, getAssetsOffByBranchStart, putAssetStart, putManyAssetsStart, patchAssetStart, patchAddInventoryAssetStart, deleteAssetStart } = assetsSlice.actions;
export default assetsSlice.reducer;