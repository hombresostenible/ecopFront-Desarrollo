/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { IContactUs } from '../../types/contactUs.types';
import { contactUsData, errorContactUs, postCrmSupplierStart} from './contactUsSlice';

//CREAR DE UN PROVEEDOR
export const postContactUs = (formData: IContactUs) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postCrmSupplierStart(formData));
        const response = await axiosInstance.post('/contact-us', formData);
        dispatch(contactUsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorContactUs(error.response?.data.message));
        } else {
            dispatch(errorContactUs(error.message));
        }
    }
};