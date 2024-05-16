/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { IAssets } from '../../types/User/assets.types';
import { assetsData, errorAssets, postAssetStart, postManyAssetsStart, getAssetsStart, getAssetsByBranchStart, getAssetStart, putAssetStart, putManyAssetsStart, patchAssetStart, deleteAssetStart } from './assetsSlice';

//CREAR DE UN EQUIPO, HERRAMIENTA O MAQUINA
export const postAsset = (formData: IAssets, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postAssetStart(formData));
        const response = await axiosInstance.post('/assets', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(assetsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//CREAR MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS
export const postManyAssets = (formData: IAssets[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyAssetsStart(formData));
        const response = await axiosInstance.post('/assets/createMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(assetsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const getAssets = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/assets', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetsStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER POR SEDE
export const getAssetsByBranch = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/assets', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//OBTIENE UN EQUIPO, HERRAMIENTA O MAQUINA POR ID
export const getAsset = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/assets/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//ACTUALIZA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putAsset = (idBranch: string, formData: IAssets, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putAssetStart());
        const response = await axiosInstance.put(`/assets/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(assetsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//ACTUALIZA MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putManyAssets = (formData: IAssets[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putManyAssetsStart(formData));
        const response = await axiosInstance.post('/assets/updateMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(assetsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//DA DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchAsset = (idBranch: string, formData: IAssets, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchAssetStart());
        const response = await axiosInstance.put(`/assets/${idBranch}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(assetsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
}

//ELIMINAUN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteAsset = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAssetStart());
        const response = await axiosInstance.delete(`/assets/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(assetsData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};