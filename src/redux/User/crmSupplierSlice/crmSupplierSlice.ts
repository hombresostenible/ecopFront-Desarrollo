import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICrmSupplier } from '../../../types/User/crmSupplier.types';

interface CrmSupplierState {
    crmSupplier: ICrmSupplier | ICrmSupplier[] | null;
    loading: boolean;
    errorCrmSupplier: string[] | null;
}

const initialState: CrmSupplierState = {
    crmSupplier: null,
    loading: false,
    errorCrmSupplier: null,
};

const crmSupplierSlice = createSlice({
    name: 'crmSupplier',
    initialState,
    reducers: {
        crmSupplierData: (state, action: PayloadAction<ICrmSupplier | null>) => {
            state.loading = false;
            state.crmSupplier = action.payload;
        },
        errorCrmSupplier: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorCrmSupplier = action.payload;
        },
        postCrmSupplierStart: (state, action: PayloadAction<ICrmSupplier  | null>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        getCrmSuppliersStart: (state, action: PayloadAction<ICrmSupplier>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        getCrmSupplierByIdStart: (state, action: PayloadAction<ICrmSupplier>) => {
            state.loading = false;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        getCrmSuppliersByBranchStart: (state, action: PayloadAction<ICrmSupplier[]>) => {
            state.loading = true;
            state.crmSupplier = action.payload;
            state.errorCrmSupplier = null;
        },
        putCrmSupplierStart: (state) => {
            state.loading = true;
            state.errorCrmSupplier = null;
        },
        deleteCrmSupplierStart: (state) => {
            state.loading = true;
            state.errorCrmSupplier = null;
        },
    },
});

export const { crmSupplierData, errorCrmSupplier, postCrmSupplierStart, getCrmSuppliersStart, getCrmSupplierByIdStart, getCrmSuppliersByBranchStart, putCrmSupplierStart, deleteCrmSupplierStart } = crmSupplierSlice.actions;
export default crmSupplierSlice.reducer;