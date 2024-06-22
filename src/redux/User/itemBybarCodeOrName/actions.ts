/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { errorItemByBarCodeOrName, getItemByBarCodeStart, getItemByNameStart } from './itemByBarCodeOrNameSlice';

//BUSCA UN ITEM POR CODIGO DE BARRAS EN TODAS LAS TABLAS
export const getItemByBarCode = (barCode: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/item-by-barCode-or-name/bar-code/${barCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getItemByBarCodeStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorItemByBarCodeOrName(error.response?.data.message));
        } else {
            dispatch(errorItemByBarCodeOrName(error.message));
        }
    }
};



//BUSCA UN ITEM POR NOMBRE EN TODAS LAS TABLAS
export const getItemByName = (nameItem: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/item-by-barCode-or-name/name-item/query?nameItem=${nameItem}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getItemByNameStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorItemByBarCodeOrName(error.response?.data.message));
        } else {
            dispatch(errorItemByBarCodeOrName(error.message));
        }
    }
};