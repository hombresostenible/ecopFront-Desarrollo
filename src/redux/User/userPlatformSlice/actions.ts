/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IUserPlatform } from '../../../types/User/userPlatform.types';
import { userPlatformData, errorUserPlatform, postUserPlatformStart, postManyUsersPlatformStart, getUsersPlatformStart, getUserPlatformByIdStart, getUserPlatformsByBranchStart, putUserPlatformStart, putManyUsersPlatformStart, patchUserPlatformStart, deleteUserPlatformStart } from './userPlatformSlice';

//CREAR DE UN EQUIPO, HERRAMIENTA O MAQUINA
export const postUserPlatform = (formData: IUserPlatform, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postUserPlatformStart(formData));
        const response = await axiosInstance.post('/userPlatform', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//CREAR MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS
export const postManyUsersPlatform = (formData: IUserPlatform[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyUsersPlatformStart(formData));
        const response = await axiosInstance.post('/userPlatform/createMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const getUsersPlatform = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/userPlatform', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUsersPlatformStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//OBTIENE UN EQUIPO, HERRAMIENTA O MAQUINA POR ID
export const getUserPlatformById = (idService: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/userPlatform/${idService}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUserPlatformByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//OBTIENE TODOS LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER POR SEDE
export const getUserPlatformsByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/userPlatform/usersPlatform-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getUserPlatformsByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//ACTUALIZA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const putUserPlatform = (idService: string, formData: IUserPlatform, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putUserPlatformStart());
        const response = await axiosInstance.put(`/userPlatform/${idService}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//ACTUALIZA MUCHOS EQUIPOS, HERRAMIENTAS O MAQUINAS DEL USER
export const putManyUserPlatform = (formData: IUserPlatform[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putManyUsersPlatformStart(formData));
        const response = await axiosInstance.put('/userPlatform/updateMany', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};

//DA DE BAJA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const patchUserPlatform = (idService: string, formData: IUserPlatform, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchUserPlatformStart());
        const response = await axiosInstance.patch(`/userPlatform/${idService}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
}

//ELIMINA UN EQUIPO, HERRAMIENTA O MAQUINA DEL USER
export const deleteUserPlatform = (idService: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteUserPlatformStart());
        const response = await axiosInstance.delete(`/userPlatform/${idService}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userPlatformData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorUserPlatform(error.response?.data.message));
        } else {
            dispatch(errorUserPlatform(error.message));
        }
    }
};