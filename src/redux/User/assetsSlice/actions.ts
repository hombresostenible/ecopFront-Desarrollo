/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IAssets } from '../../../types/User/assets.types';
import { assetsData, errorAssets, postAssetStart, postManyAssetsStart, getAssetsStart, getAssetByIdStart, getAssetsByBranchStart, putAssetStart, putManyAssetsStart, patchAssetStart, deleteAssetStart } from './assetsSlice';

//CREAR DE UN EQUIPO, HERRAMIENTA O MAQUINA
export const postAsset = (formData: IAssets, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postAssetStart(formData));
        const response = await axiosInstance.post('/asset', formData, {
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
        const response = await axiosInstance.post('/asset/createMany', formData, {
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
        const response = await axiosInstance.get('/asset', {
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

//OBTIENE UN EQUIPO, HERRAMIENTA O MAQUINA POR ID
export const getAssetById = (idAssets: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/asset/${idAssets}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAssets(error.response?.data.message));
        } else {
            dispatch(errorAssets(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER POR SEDE
export const getAssetsByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/asset/assets-branch/${idBranch}`, {
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

//ACTUALIZA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putAsset = (idAssets: string, formData: IAssets, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putAssetStart());
        const response = await axiosInstance.put(`/asset/${idAssets}`, formData, {
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
        const response = await axiosInstance.put('/asset/updateMany', formData, {
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
export const patchAsset = (idAssets: string, formData: { assetStatus: string }, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchAssetStart());
        const response = await axiosInstance.patch(`/asset/${idAssets}`, formData, {
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

//ELIMINA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteAsset = (idAssets: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAssetStart());
        const response = await axiosInstance.delete(`/asset/${idAssets}`, {
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