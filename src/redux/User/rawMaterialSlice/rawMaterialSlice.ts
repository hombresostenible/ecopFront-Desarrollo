import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRawMaterial } from '../../../types/User/rawMaterial.types';

interface RawMaterialState {
    rawMaterial: IRawMaterial | IRawMaterial[] | null;
    loading: boolean;
    errorRawMaterial: string[] | null;
}

const initialState: RawMaterialState = {
    rawMaterial: null,
    loading: false,
    errorRawMaterial: null,
};

const rawMaterialSlice = createSlice({
    name: 'rawMaterial',
    initialState,
    reducers: {
        rawMaterialData: (state, action: PayloadAction<IRawMaterial | null>) => {
            state.loading = false;
            state.rawMaterial = action.payload;
        },
        errorRawMaterial: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorRawMaterial = action.payload;
        },
        postRawMaterialStart: (state, action: PayloadAction<IRawMaterial  | null>) => {
            state.loading = true;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        postManyRawMaterialsStart: (state, action: PayloadAction<IRawMaterial[]>) => {
            state.loading = true;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        getRawMaterialsStart: (state, action: PayloadAction<IRawMaterial>) => {
            state.loading = true;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        getRawMaterialByIdStart: (state, action: PayloadAction<IRawMaterial>) => {
            state.loading = false;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        getRawMaterialsByBranchStart: (state, action: PayloadAction<IRawMaterial[]>) => {
            state.loading = true;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        getRawMaterialsOffStart: (state, action: PayloadAction<IRawMaterial[]>) => {
            state.loading = true;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        putRawMaterialStart: (state) => {
            state.loading = true;
            state.errorRawMaterial = null;
        },
        putManyRawMaterialsStart: (state, action: PayloadAction<IRawMaterial[]>) => {
            state.loading = true;
            state.rawMaterial = action.payload;
            state.errorRawMaterial = null;
        },
        patchRawMaterialStart: (state) => {
            state.loading = true;
            state.errorRawMaterial = null;
        },
        patchAddInventoryRawMaterialStart: (state) => {
            state.loading = true;
            state.errorRawMaterial = null;
        },
        deleteRawMaterialStart: (state) => {
            state.loading = true;
            state.errorRawMaterial = null;
        },
    },
});

export const { rawMaterialData, errorRawMaterial, postRawMaterialStart, postManyRawMaterialsStart, getRawMaterialsStart, getRawMaterialByIdStart, getRawMaterialsByBranchStart, getRawMaterialsOffStart, putRawMaterialStart, putManyRawMaterialsStart, patchRawMaterialStart, patchAddInventoryRawMaterialStart, deleteRawMaterialStart } = rawMaterialSlice.actions;
export default rawMaterialSlice.reducer;