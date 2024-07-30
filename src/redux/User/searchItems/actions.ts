/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { errorItems, getItemsStart } from './searchItemsSlice';

//BUSCA UN ITEM POR CODIGO DE BARRAS EN TODAS LAS TABLAS
export const getItems = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/all-items`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        console.log('response.data: ', response.data.result)
        dispatch(getItemsStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorItems(error.response?.data.message));
        } else {
            dispatch(errorItems(error.message));
        }
    }
};
