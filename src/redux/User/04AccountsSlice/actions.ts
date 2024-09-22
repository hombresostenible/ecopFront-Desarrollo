/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IAccountsBook } from '../../../types/User/accountsBook.types';
import { accountsBookData, errorAccountsBook, postAccountsBookStart, getAccountsBooksStart, getAccountsBooksPaginatedStart, getAccountsBooksApprovedStart, getAccountsBooksIncomesStart, getAccountsBooksIncomesApprovedByBranchStart, getAccountsBooksExpensesStart, getAccountsBookByIdStart, getAccountsBookByBranchStart, getIncomesNotApprovedStart, getIncomesNotApprovedByBranchStart, patchIncomesNotApprovedStart, putAccountsBookStart, deleteAccountsBookStart } from './accountsBookSlice';

//CREAR DE UN REGISTRO EN EL LIBRO DIARIO
export const postAccountsBook = (formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postAccountsBookStart(formData));
        const response = await axiosInstance.post('/accounts-book', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTRO DEL LIBRO DIARIO
export const getAccountsBooks = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/accounts-book', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTRO DEL LIBRO DIARIO PAGINADOS PARA RENDERIZARLOS EN LA TABLA DE CONSULTA
export const getAccountsBooksPaginated = (token: string, page: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/paginated?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksPaginatedStart({
            registers: response.data.registers,
            totalRegisters: response.data.totalRegisters,
            totalPages: response.data.registers.totalPages,
            currentPage: response.data.registers.currentPage,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTROS CONTABLES APROBADOS TANTO DE INGRESOS COMO DE GASTOS DEL USER
export const getAccountsBooksApproved = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/accounts-book/approved', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksApprovedStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
}

//OBTENER TODOS LOS REGISTROS CONTABLES APROBADOS POR SEDE, TANTO DE INGRESOS COMO DE GASTOS DEL USER
export const getAccountsBooksApprovedByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/approved/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksIncomesApprovedByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
}

//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
export const getAccountsBooksIncomesApproved = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/accounts-book/incomes', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksIncomesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
}

//OBTENER TODOS LOS REGISTROS DE INGRESOS APROBADOS DEL USER
export const getAccountsBooksIncomesApprovedByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/incomes-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksIncomesApprovedByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
}

//OBTENER TODOS LOS REGISTRO DE GASTO DEL LIBRO DIARIO
export const getAccountsBooksExpenses = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/accounts-book/expenses', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBooksExpensesStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER UN REGISTRO DEL LIBRO DIARIO POR ID
export const getAccountsBookById = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS REGISTROS DEL LIBRO DIARIO POR SEDE
export const getAccountsBookByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/accounts-book-branch/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAccountsBookByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};                    

//OBTENER TODOS LOS INGRESOS NO APROBADOS
export const getIncomesNotApproved = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/accounts-book/incomes-not-approved', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getIncomesNotApprovedStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//OBTENER TODOS LOS INGRESOS NO APROBADOS POR SEDE
export const getIncomesNotApprovedByBranch = (idBranch: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/accounts-book/incomes-not-approved/${idBranch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getIncomesNotApprovedByBranchStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//APROBAR UN INGRESO PENDIENTE DE APROBAR
export const patchIncomesNotApproved = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchIncomesNotApprovedStart());
        const response = await axiosInstance.patch(`/accounts-book/incomes-not-approved/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
}

//ACTUALIZA UN REGISTRO DEL LIBRO DIARIO
export const putAccountsBook = (idAccountsBook: string, formData: IAccountsBook, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putAccountsBookStart());
        const response = await axiosInstance.put(`/accounts-book/${idAccountsBook}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};

//ELIMINA UN REGISTRO DEL LIBRO DIARIO
export const deleteAccountsBook = (idAccountsBook: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteAccountsBookStart());
        const response = await axiosInstance.delete(`/accounts-book/${idAccountsBook}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(accountsBookData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(errorAccountsBook(error.response?.data.message));
        } else {
            dispatch(errorAccountsBook(error.message));
        }
    }
};