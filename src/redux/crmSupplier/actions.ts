/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { ICrmSupplier } from '../../types/User/crmSupplier.types';
import { crmSupplierData, errorCrmSupplier, postCrmSupplierStart, getCrmSuppliersStart, getCrmSupplierStart, getCrmSuppliersByBranchStart, putCrmSupplierStart, deleteCrmSupplierStart } from './crmSupplierSlice';

//CREAR DE UN PROVEEDOR
export const postCrmSupplier = (formData: ICrmSupplier, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postCrmSupplierStart(formData));
        const response = await axiosInstance.post('/crmSupplier', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTIENE TODOS LOS PROVEEDORES DEL USER
export const getCrmSuppliers = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/crmSupplier', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSuppliersStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTIENE UN PROVEEDOR POR ID DEL USER
export const getCrmSupplier = (idCrmSupplier: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crmSupplier/${idCrmSupplier}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSupplierStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//OBTIENE TODOS LOS PROVEEDORES POR SEDE DEL USER
export const getCrmSuppliersByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/crmSupplier/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCrmSuppliersByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//ACTUALIZA UN PROVEEDOR DEL USER
export const putCrmSupplier = (idCrmSupplier: string, formData: ICrmSupplier, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putCrmSupplierStart());
        const response = await axiosInstance.put(`/crmSupplier/${idCrmSupplier}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};

//ELIMINA UN PROVEEDOR DEL USER
export const deleteCrmSupplier = (idCrmSupplier: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteCrmSupplierStart());
        const response = await axiosInstance.delete(`/crmSupplier/${idCrmSupplier}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(crmSupplierData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorCrmSupplier(error.response?.data.message));
        } else {
            dispatch(errorCrmSupplier(error.message));
        }
    }
};