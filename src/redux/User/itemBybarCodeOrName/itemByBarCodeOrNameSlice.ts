import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAssets } from '../../../types/User/assets.types';
import { IMerchandise } from '../../../types/User/merchandise.types';
import { IProduct } from '../../../types/User/products.types';
import { IRawMaterial } from '../../../types/User/rawMaterial.types';
import { IService } from '../../../types/User/services.types';

interface ItemByBarCodeOrNameSliceState {
    itemByBarCodeOrName: IAssets | IAssets[] | IMerchandise | IMerchandise[] | IProduct | IProduct [] | IRawMaterial | IRawMaterial[] | IService | IService[] | null;
    loading: boolean;
    errorItemByBarCodeOrName: string[] | null;
}

const initialState: ItemByBarCodeOrNameSliceState = {
    itemByBarCodeOrName: null,
    loading: false,
    errorItemByBarCodeOrName: null,
};

const itemByBarCodeOrNameSlice = createSlice({
    name: 'itemByBarCodeOrName',
    initialState,
    reducers: {
        setItemByBarCodeOrNameData: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = false;
            state.itemByBarCodeOrName = action.payload;
        },
        errorItemByBarCodeOrName: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorItemByBarCodeOrName = action.payload;
        },
        getItemByBarCodeStart: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = true;
            state.itemByBarCodeOrName = action.payload;
            state.errorItemByBarCodeOrName = null;
        },

        getItemByNameStart: (state, action: PayloadAction<IAssets | IMerchandise | IProduct | IRawMaterial | IService>) => {
            state.loading = true;
            state.itemByBarCodeOrName = action.payload;
            state.errorItemByBarCodeOrName = null;
        },

    },
});

export const { setItemByBarCodeOrNameData, errorItemByBarCodeOrName, getItemByBarCodeStart, getItemByNameStart } = itemByBarCodeOrNameSlice.actions;
export default itemByBarCodeOrNameSlice.reducer;