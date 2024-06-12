/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../../store';
import axiosInstance from '../../../../api/axios';
import {
    errorFinantialIndicator,
    getSalesPerPeriodStart,
    getSalesPerPeriodByBranchStart,
    getExpensesPerPeriodStart,
    getExpensesPerPeriodByBranchStart,
    getAllTransactionsPerPeriodStart,
    getAllTransactionsPerPeriodByBranchStart,
    getAccountsReceivableStart,
    getAccountsReceivableByBranchStart,
    getAccountsPayableStart,
    getAccountsPayableByBranchStart,
    getBestClientValueStart,
    getBestClientValueByBranchStart,
    getBestClientQuantityStart,
    getBestClientQuantityByBranchStart,
    getAverageTicketPerPeriodStart,
    getAverageTicketPerPeriodByBranchStart,
    getAssetsInventoryStart,
    getAssetsInventoryByBranchStart,
    getMerchandisesInventoryStart,
    getMerchandisesInventoryByBranchStart,
    getProductsInventoryStart,
    getProductsInventoryByBranchStart,
    getRawmaterialsInventoryStart,
    getRawmaterialsInventoryByBranchStart,
} from './finantialIndicatorsSlice';

//
export const getSalesPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getSalesPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getSalesPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getSalesPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getExpensesPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getExpensesPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getExpensesPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getExpensesPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAllTransactionsPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAllTransactionsPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAllTransactionsPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAllTransactionsPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};
    
//
export const getAccountsReceivable = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsReceivableStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAccountsReceivableByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsReceivableByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAccountsPayable = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsPayableStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAccountsPayableByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsPayableByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getBestClientValue = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientValueStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getBestClientValueByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientValueByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};
    
//
export const getBestClientQuantity = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientQuantityStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getBestClientQuantityByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getBestClientQuantityByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAverageTicketPerPeriod = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAverageTicketPerPeriodStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAverageTicketPerPeriodByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAverageTicketPerPeriodByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAssetsInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetsInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getAssetsInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAssetsInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getMerchandisesInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandisesInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getMerchandisesInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getMerchandisesInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getProductsInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductsInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getProductsInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductsInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getRawmaterialsInventory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/sustainabilityIndicators/', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawmaterialsInventoryStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};

//
export const getRawmaterialsInventoryByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/sustainabilityIndicators/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getRawmaterialsInventoryByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorFinantialIndicator(error.response?.data.message));
        } else {
            dispatch(errorFinantialIndicator(error.message));
        }
    }
};