/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IRawMaterial } from '../../../types/User/rawMaterial.types';
import { rawMaterialData, errorRawMaterial, postRawMaterialStart, postManyRawMaterialsStart, getRawMaterialsStart, getRawMaterialByIdStart, getRawMaterialsByBranchStart, putRawMaterialStart, putManyRawMaterialsStart, patchRawMaterialStart, deleteRawMaterialStart } from './rawMaterialSlice';

//CREAR DE UN EQUIPO, HERRAMIENTA O MAQUINA
export const postRawMaterial = (formData: IRawMaterial, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postRawMaterialStart(formData));
        const response = await axiosInstance.post('/rawMaterial', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(rawMaterialData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//CREAR MUCHAS MATERIAS PRIMAS
export const postManyRawMaterials = (formData: IRawMaterial[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyRawMaterialsStart(formData));
        const response = await axiosInstance.post('/rawMaterial/createMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(rawMaterialData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//OBTIENE TODAS LOS MATERIAS PRIMAS DEL USER
export const getRawMaterials = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/rawMaterial', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawMaterialsStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//OBTIENE UNA MATERIAS PRIMAS POR ID
export const getRawMaterialById = (idProduct: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/rawMaterial/${idProduct}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawMaterialByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//OBTIENE TODAS LAS MATERIAS PRIMAS DEL USER POR SEDE
export const getRawMaterialsByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/rawMaterial/rawMaterials-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawMaterialsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//ACTUALIZA UNA MATERIAS PRIMAS DEL USER
export const putRawMaterial = (idProduct: string, formData: IRawMaterial, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putRawMaterialStart());
        const response = await axiosInstance.put(`/rawMaterial/${idProduct}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(rawMaterialData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//ACTUALIZA MUCHAS MATERIAS PRIMAS DEL USER
export const putManyRawMaterials = (formData: IRawMaterial[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putManyRawMaterialsStart(formData));
        const response = await axiosInstance.put('/rawMaterial/updateMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(rawMaterialData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};

//DA DE BAJA UNA MATERIAS PRIMAS DEL USER
export const patchRawMaterial = (idProduct: string, formData: IRawMaterial, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchRawMaterialStart());
        const response = await axiosInstance.patch(`/rawMaterial/${idProduct}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(rawMaterialData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
}

//ELIMINA UNA MATERIAS PRIMAS DEL USER
export const deleteRawMaterial = (idProduct: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteRawMaterialStart());
        const response = await axiosInstance.delete(`/rawMaterial/${idProduct}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(rawMaterialData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorRawMaterial(error.response?.data.message));
        } else {
            dispatch(errorRawMaterial(error.message));
        }
    }
};