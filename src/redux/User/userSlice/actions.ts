/* eslint-disable @typescript-eslint/no-explicit-any */
import jsCookie from 'js-cookie';
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IUser } from '../../../types/User/user.types';
import { IResetPassword } from '../../../types/User/resetPassword.types';
import { IResetPasswordBlocked } from '../../../types/User/resetPasswordBlocked.types';
import { userData, userErrors, registerUserStart, isAuthenticatedStatus, loginStart, profileStart, sendEmailPasswordChangeRequest, passwordChange, accountUnlocking, logoChange, deleteLogo } from './userSlice';

//REGISTRO DE USUARIOS
export const postRegisterClient = (formData: IUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(registerUserStart(formData));
        const response = await axiosInstance.post('/user/register', formData);
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            console.log('Error: ', error.response?.data)
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error.response?.data));
        }
    }
};

//LOGIN DE USUARIOS
export const loginUser = (loginData: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.post('/auth/login', loginData);
        jsCookie.set('token', response.data.token); 
        dispatch(loginStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(userErrors(error.response?.data.message));
        } else {
            dispatch(userErrors(error.response?.data.message));
        }
    }
};

//VERIFICA EL TOKEN CADA QUE ENTRE A UNA RUTA PROTEGIDA
export const verifyTokenRequest = (token: string) => {
    return axiosInstance.get(`/auth/verifyToken`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//PERFIL DE USUARIO
export const getProfileUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(profileStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(userErrors(error.response?.data.message));
        } else {
            dispatch(userErrors(error.message));
        }
    }
};

//ENVIA CORREO PARA SOLICITUD DE CAMBIO DE CONTRASEÑA
export const sendEmailPasswordChangeUser = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(sendEmailPasswordChangeRequest());
        return await axiosInstance.get('/user/email', { params: { email } });
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//CAMBIO DE CONTRASEÑA
export const passwordChangeUser = (idUser: string, passwordResetCode: string, formData: IResetPassword) => async (dispatch: AppDispatch) => {
    try {
        dispatch(passwordChange());
        return await axiosInstance.put(`/user/resetPassword/${idUser}/${passwordResetCode}`, formData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//DESBLOQUEO DE CUENTA Y CAMBIO DE CONTRASEÑA
export const accountUnlockingUser = (idUser: string, formData: IResetPasswordBlocked) => async (dispatch: AppDispatch) => {
    try {
        dispatch(accountUnlocking());
        return await axiosInstance.put(`/user/resetPasswordBlocked/${idUser}`, formData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//CAMBIAR LA FOTO DE PERFIL
export const logoChangeUser= (formData: IUser, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(logoChange(formData));
        const response = await axiosInstance.patch('/user/logo', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//ELIMINAR LA FOTO DE PERFIL
export const deleteLogoUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteLogo());
        const response = await axiosInstance.patch('/user/deleteLogo', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(userData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(userErrors(error.response?.data));
        } else {
            dispatch(userErrors(error));
        }
    }
};

//LOGOUT DE USUARIOS                        
export const logoutUser = () => (dispatch: AppDispatch) => {
    jsCookie.remove('token');
    dispatch(isAuthenticatedStatus(false));
    dispatch(userData(null));
    window.location.href = "/login";
};