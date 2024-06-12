/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IAccountsBook } from '../../../types/User/accountsBook.types';
import { accountsBookData, errorAccountsBook, postAccountsBookStart, getAccountsBooksStart, getAccountsBooksIncomesStart, getAccountsBookByIdStart, getAccountsBookByBranchStart, putAccountsBookStart, deleteAccountsBookStart } from './accountsBookSlice';

//CREAR DE UN REGISTRO EN EL LIBRO DIARIO
export const postAccountsBook = (formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postAccountsBookStart(formData));
        const response = await axiosInstance.post('/accountsBook', formData, {
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
        const response = await axiosInstance.get('/accountsBook', {
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

//OBTENER TODOS LOS REGISTRO DEL LIBRO DIARIO
export const getAccountsBooksIncomes = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/accountsBook/incomes', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksIncomesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID
export const getAccountsBookById = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accountsBook/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTROS DEL LIBRO DIARIO POR SEDE
export const getAccountsBookByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accountsBook/accountsBook-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//ACTUALIZA UN REGISTRO DEL LIBRO DIARIO
export const putAccountsBook = (idAccountsBook: string, formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putAccountsBookStart());
        const response = await axiosInstance.put(`/accountsBook/${idAccountsBook}`, formData, {
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
export const deleteAccountsBook = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAccountsBookStart());
        const response = await axiosInstance.delete(`/accountsBook/${idAccountsBook}`, {
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