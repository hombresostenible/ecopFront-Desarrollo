/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { IAccountsBook } from '../../types/User/accountsBook.types';
import { accountsBookData, errorAccountsBook, postAccountsBookStart, getAccountsBooksStart, getAccountsBookStart, putAccountsBookStart, deleteAccountsBookStart } from './accountsBookSlice';

//CREAR DE UN REGISTRO EN EL LIBRO DIARIO
export const postAccountsBook = (formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postAccountsBookStart(formData));
        const response = await axiosInstance.post('/branch', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTRO DEL LIBRO DIARIO
export const getAccountsBooks = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/branch', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID
export const getAccountsBook = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//ACTUALIZA UN REGISTRO DEL LIBRO DIARIO
export const putAccountsBook = (idBranch: string, formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putAccountsBookStart());
        const response = await axiosInstance.put(`/branch/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//ELIMINA UN REGISTRO DEL LIBRO DIARIO
export const deleteAccountsBook = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAccountsBookStart());
        const response = await axiosInstance.delete(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};