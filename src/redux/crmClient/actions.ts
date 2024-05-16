/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { ICrmClient } from '../../types/User/crmClient.types';
import { crmClientData, errorCrmClient, postCrmClientStart, getCrmClientsStart, getCrmClientsByBranchStart, getCrmClientStart, putCrmClientStart, deleteCrmClientStart } from './crmClientSlice';

//CREAR DE UN CLIENTE
export const postCrmClient = (formData: ICrmClient, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postCrmClientStart(formData));
        const response = await axiosInstance.post('/crmClients', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTIENE TODOS LOS CLIENTES DEL USER
export const getCrmClients = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/crmClients', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientsStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTIENE TODOS LOS CLIENTES POR SEDE DEL USER
export const getCrmClientsByBranch = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/crmClients', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//OBTIENE UN CLIENTE POR ID DEL USER
export const getCrmClient = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crmClients/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmClientStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//ACTUALIZA UN CLIENTE DEL USER
export const putCrmClient = (idBranch: string, formData: ICrmClient, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putCrmClientStart());
        const response = await axiosInstance.put(`/crmClients/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};

//ELIMINA UN CLIENTE DEL USER
export const deleteCrmClient = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteCrmClientStart());
        const response = await axiosInstance.delete(`/crmClients/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmClientData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmClient(error.response?.data.message));
        } else {
            dispatch(errorCrmClient(error.message));
        }
    }
};