import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContactUs } from '../../../types/Ecopcion/contactUs.types';

interface ContactUsState {
    contactUs: IContactUs | null;
    loading: boolean;
    errorContactUs: string[] | null;
}

const initialState: ContactUsState = {
    contactUs: null,
    loading: false,
    errorContactUs: null,
};

const contactUsSlice = createSlice({
    name: 'contactUs',
    initialState,
    reducers: {
        contactUsData: (state, action: PayloadAction<IContactUs>) => {
            state.loading = false;
            state.contactUs = action.payload;
        },
        errorContactUs: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorContactUs = action.payload;
        },
        postCrmSupplierStart: (state, action: PayloadAction<IContactUs>) => {
            state.loading = true;
            state.contactUs = action.payload;
            state.errorContactUs = null;
        },
    },
});

export const { contactUsData, errorContactUs, postCrmSupplierStart } = contactUsSlice.actions;
export default contactUsSlice.reducer;