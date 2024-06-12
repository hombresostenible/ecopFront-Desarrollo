/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../../store';
import axiosInstance from '../../../../api/axios';
import {
    errorMarketingIndicators,
    getCustomerAcquisitionStart,
    getCustomerAcquisitionByBranchStart,
    getCustomerRetentionStart,
    getCustomerRetentionByBranchStart,
    getCustomerDigitalStart,
    getCustomerDigitalByBranchStart,
} from './marketingIndicatorSlice';

//
export const getCustomerAcquisition = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCustomerAcquisitionStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMarketingIndicators(error.response?.data.message));
        } else {
            dispatch(errorMarketingIndicators(error.message));
        }
    }
};

//
export const getCustomerAcquisitionByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCustomerAcquisitionByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMarketingIndicators(error.response?.data.message));
        } else {
            dispatch(errorMarketingIndicators(error.message));
        }
    }
};

//
export const getCustomerRetention = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCustomerRetentionStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMarketingIndicators(error.response?.data.message));
        } else {
            dispatch(errorMarketingIndicators(error.message));
        }
    }
};

//
export const getCustomerRetentionByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCustomerRetentionByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMarketingIndicators(error.response?.data.message));
        } else {
            dispatch(errorMarketingIndicators(error.message));
        }
    }
};

//
export const getCustomerDigital = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCustomerDigitalStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMarketingIndicators(error.response?.data.message));
        } else {
            dispatch(errorMarketingIndicators(error.message));
        }
    }
};

//
export const getCustomerDigitalByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getCustomerDigitalByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorMarketingIndicators(error.response?.data.message));
        } else {
            dispatch(errorMarketingIndicators(error.message));
        }
    }
};