import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICrmClient } from '../../../types/User/crmClient.types';

interface CrmClientState {
    crmClient: ICrmClient | ICrmClient[] | null;
    loading: boolean;
    errorCrmClient: string[] | null;
}

const initialState: CrmClientState = {
    crmClient: null,
    loading: false,
    errorCrmClient: null,
};

const crmClientSlice = createSlice({
    name: 'crmClient',
    initialState,
    reducers: {
        crmClientData: (state, action: PayloadAction<ICrmClient | null>) => {
            state.loading = false;
            state.crmClient = action.payload;
        },
        errorCrmClient: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorCrmClient = action.payload;
        },
        postCrmClientStart: (state, action: PayloadAction<ICrmClient  | null>) => {
            state.loading = true;
            state.crmClient = action.payload;
            state.errorCrmClient = null;
        },
        postManyCrmClientsStart: (state, action: PayloadAction<ICrmClient[]>) => {
            state.loading = true;
            state.crmClient = action.payload;
            state.errorCrmClient = null;
        },
        getCrmClientsStart: (state, action: PayloadAction<ICrmClient>) => {
            state.loading = true;
            state.crmClient = action.payload;
            state.errorCrmClient = null;
        },
        getCrmClientByIdStart: (state, action: PayloadAction<ICrmClient>) => {
            state.loading = false;
            state.crmClient = action.payload;
            state.errorCrmClient = null;
        },
        getCrmClientsByBranchStart: (state, action: PayloadAction<ICrmClient[]>) => {
            state.loading = true;
            state.crmClient = action.payload;
            state.errorCrmClient = null;
        },
        putCrmClientStart: (state) => {
            state.loading = true;
            state.errorCrmClient = null;
        },
        deleteCrmClientStart: (state) => {
            state.loading = true;
            state.errorCrmClient = null;
        },
        sendEmailCRMClientStart: (state) => {
            state.loading = false;
            state.errorCrmClient = null;
        },
    },
});

export const { crmClientData, errorCrmClient, postCrmClientStart, postManyCrmClientsStart, getCrmClientsStart, getCrmClientByIdStart, getCrmClientsByBranchStart, putCrmClientStart, deleteCrmClientStart, sendEmailCRMClientStart } = crmClientSlice.actions;
export default crmClientSlice.reducer;