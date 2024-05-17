/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import { IMerchandise } from '../../types/User/merchandise.types';
import { merchandiseData, errorMerchandise, postMerchandisetart, postManyMerchandisesStart, getMerchandisesStart, getMerchandiseByIdStart, getMerchandisesByBranchStart, putMerchandiseStart, putManyMerchandisesStart, patchMerchandiseStart, deleteMerchandiseStart } from './merchandiseSlice';

//CREAR DE UN EQUIPO, HERRAMIENTA O MAQUINA
export const postMerchandise = (formData: IMerchandise, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postMerchandisetart(formData));
        const response = await axiosInstance.post('/merchandise', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(merchandiseData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//CREAR MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS
export const postManyMerchandises = (formData: IMerchandise[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyMerchandisesStart(formData));
        const response = await axiosInstance.post('/merchandise/createMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(merchandiseData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const getMerchandises = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/merchandise', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandisesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//OBTIENE UN EQUIPO, HERRAMIENTA O MAQUINA POR ID
export const getMerchandiseById = (idMerchandise: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/merchandise/${idMerchandise}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandiseByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER POR SEDE
export const getMerchandisesByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/merchandise/merchandises-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandisesByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//ACTUALIZA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putMerchandise = (idMerchandise: string, formData: IMerchandise, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putMerchandiseStart());
        const response = await axiosInstance.put(`/merchandise/${idMerchandise}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(merchandiseData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//ACTUALIZA MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putManyMerchandises = (formData: IMerchandise[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putManyMerchandisesStart(formData));
        const response = await axiosInstance.put('/merchandise/updateMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(merchandiseData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};

//DA DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchMerchandise = (idMerchandise: string, formData: IMerchandise, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchMerchandiseStart());
        const response = await axiosInstance.patch(`/merchandise/${idMerchandise}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(merchandiseData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
}

//ELIMINA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteMerchandise = (idMerchandise: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteMerchandiseStart());
        const response = await axiosInstance.delete(`/merchandise/${idMerchandise}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(merchandiseData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorMerchandise(error.response?.data.message));
        } else {
            dispatch(errorMerchandise(error.message));
        }
    }
};