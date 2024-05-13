/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { IBranch } from '../../types/User/branch.types';
import { branchData, createBranchStart, branchStartErrors, createManyBranchStart, getBranchesStart, getBranchStart, putBranchStart, deleteBranchStart } from './branchSlice';

//CREAR DE UNA SEDE
export const postBranch = (formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createBranchStart());
        const response = await axiosInstance.post('/branch', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(branchStartErrors(error.response?.data.message));
        } else {
            dispatch(branchStartErrors(error.message));
        }
    }
};



//CREAR MUCHAS SEDES
export const postManyBranch = (formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(createManyBranchStart());
        const response = await axiosInstance.post('/branch/createMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(branchStartErrors(error.response?.data.message));
        } else {
            dispatch(branchStartErrors(error.message));
        }
    }
};



//OBTENER TODAS LAS SEDES
export const getBranches = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/branch', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBranchesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(branchStartErrors(error.response?.data.message));
        } else {
            dispatch(branchStartErrors(error.message));
        }
    }
};



//OBTENER UNA SEDE POR ID
export const getBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(branchStartErrors(error.response?.data.message));
        } else {
            dispatch(branchStartErrors(error.message));
        }
    }
};



//ACTUALIZA UNA SEDE
export const putBranch = (idBranch: string, formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putBranchStart()); // Llama a putBranchStart sin argumentos
        const response = await axiosInstance.put(`/branch/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(branchStartErrors(error.response?.data.message));
        } else {
            dispatch(branchStartErrors(error.message));
        }
    }
};

//ELIMINA UNA SEDE
export const deleteBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteBranchStart()); // Llama a deleteBranchStart sin argumentos
        const response = await axiosInstance.delete(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(branchStartErrors(error.response?.data.message));
        } else {
            dispatch(branchStartErrors(error.message));
        }
    }
};