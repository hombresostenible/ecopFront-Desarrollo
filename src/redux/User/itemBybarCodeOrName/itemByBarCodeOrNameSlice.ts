import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAssets } from '../../../types/User/assets.types';
import { IMerchandise } from '../../../types/User/merchandise.types';
import { IProduct } from '../../../types/User/products.types';
import { IRawMaterial } from '../../../types/User/rawMaterial.types';
import { IService } from '../../../types/User/services.types';

interface ItemByBarCodeOrNameSliceState {
    itemByBarCode: IAssets | IAssets[] | IMerchandise | IMerchandise[] | IProduct | IProduct [] | IRawMaterial | IRawMaterial[] | IService | IService[] | null;
    itemByName: IAssets | IAssets[] | IMerchandise | IMerchandise[] | IProduct | IProduct [] | IRawMaterial | IRawMaterial[] | IService | IService[] | null;
    loading: boolean;
    errorItemByBarCodeOrName: string[] | null;
}

const initialState: ItemByBarCodeOrNameSliceState = {
    itemByBarCode: null,
    itemByName: null,
    loading: false,
    errorItemByBarCodeOrName: null,
};

const itemByBarCodeOrNameSlice = createSlice({
    name: 'itemByBarCodeOrName',
    initialState,
    reducers: {
        setItemByBarCodeData: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = false;
            state.itemByBarCode = action.payload;
        },
        errorItemByBarCode: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorItemByBarCodeOrName = action.payload;
        },
        getItemByBarCodeStart: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = true;
            state.itemByBarCode = action.payload;
            state.errorItemByBarCodeOrName = null;
        },
        
        setItemByNameData: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = false;
            state.itemByName = action.payload;
        },
        errorItemByName: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorItemByBarCodeOrName = action.payload;
        },
        getItemByNameStart: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = true;
            state.itemByName = action.payload;
            state.errorItemByBarCodeOrName = null;
        },

    },
});

export const {
    setItemByBarCodeData,
    errorItemByBarCode,
    getItemByBarCodeStart,
    setItemByNameData,
    errorItemByName,
    getItemByNameStart
} = itemByBarCodeOrNameSlice.actions;
export default itemByBarCodeOrNameSlice.reducer;