import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IService } from '../../../../types/User/services.types';

interface ServiceState {
    service: IService | IService[] | null;
    loading: boolean;
    errorService: string[] | null;
}

const initialState: ServiceState = {
    service: null,
    loading: false,
    errorService: null,
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        serviceData: (state, action: PayloadAction<IService | null>) => {
            state.loading = false;
            state.service = action.payload;
        },
        errorService: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorService = action.payload;
        },
        postServiceStart: (state, action: PayloadAction<IService  | null>) => {
            state.loading = true;
            state.service = action.payload;
            state.errorService = null;
        },
        postManyServicesStart: (state, action: PayloadAction<IService[]>) => {
            state.loading = true;
            state.service = action.payload;
            state.errorService = null;
        },
        getServicesStart: (state, action: PayloadAction<IService>) => {
            state.loading = true;
            state.service = action.payload;
            state.errorService = null;
        },
        getServiceByIdStart: (state, action: PayloadAction<IService>) => {
            state.loading = false;
            state.service = action.payload;
            state.errorService = null;
        },
        getServicesByBranchStart: (state, action: PayloadAction<IService[]>) => {
            state.loading = true;
            state.service = action.payload;
            state.errorService = null;
        },
        putServiceStart: (state) => {
            state.loading = true;
            state.errorService = null;
        },
        putManyServicesStart: (state, action: PayloadAction<IService[]>) => {
            state.loading = true;
            state.service = action.payload;
            state.errorService = null;
        },
        patchServiceStart: (state) => {
            state.loading = true;
            state.errorService = null;
        },
        deleteServiceStart: (state) => {
            state.loading = true;
            state.errorService = null;
        },
    },
});

export const { serviceData, errorService, postServiceStart, postManyServicesStart, getServicesStart, getServiceByIdStart, getServicesByBranchStart, putServiceStart, putManyServicesStart, patchServiceStart, deleteServiceStart } = serviceSlice.actions;
export default serviceSlice.reducer;