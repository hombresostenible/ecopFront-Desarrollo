/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { IBranch } from '../../types/User/branch.types';
import { branchData, errorBranch, postBranchStart, postManyBranchesStart, getBranchesStart, getBranchByIdStart, putBranchStart, deleteBranchStart } from './branchSlice';

//CREAR DE UNA SEDE
export const postBranch = (formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postBranchStart(formData));
        const response = await axiosInstance.post('/branch', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//CREAR MUCHAS SEDES
export const postManyBranch = (formData: IBranch[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyBranchesStart(formData));
        const response = await axiosInstance.post('/branch/createMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
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
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//OBTENER UNA SEDE POR ID
export const getBranchById = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBranchByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//ACTUALIZA UNA SEDE
export const putBranch = (idBranch: string, formData: IBranch, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putBranchStart());
        const response = await axiosInstance.put(`/branch/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};

//ELIMINA UNA SEDE
export const deleteBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteBranchStart());
        const response = await axiosInstance.delete(`/branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(branchData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorBranch(error.response?.data.message));
        } else {
            dispatch(errorBranch(error.message));
        }
    }
};