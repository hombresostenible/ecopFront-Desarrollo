/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FinantialIndicatorState {
    salesPerPeriod: any;                        //
    salesPerPeriodByBranch: any;                //
    expensesPerPeriod: any;                     //
    expensesPerPeriodByBranch: any;             //
    allTransactionsPerPeriod: any;              //
    allTransactionsPerPeriodByBranch: any;      //
    accountsReceivable: any;                    //
    accountsReceivableByBranch: any;            //
    accountsPayable: any;                       //
    accountsPayableByBranch: any;               //
    bestClientValue: any;                       //
    bestClientValueByBranch: any;               //
    bestClientQuantity: any;                    //
    bestClientQuantityByBranch: any;            //
    averageTicketPerPeriod: any;                //
    averageTicketPerPeriodByBranch: any;        //
    productsInventory: any;                     //
    productsInventoryByBranch: any;             //
    rawmaterialsInventory: any;                 //
    rawmaterialsInventoryByBranch: any;         //
    assetsInventory: any;                       //
    assetsInventoryByBranch: any;               //
    merchandisesInventory: any;                 //
    merchandisesInventoryByBranch: any;         //
    loading: boolean;
    errorFinantialIndicator: string[] | null;
}

const initialState: FinantialIndicatorState = {
    salesPerPeriod: null,
    salesPerPeriodByBranch: null,
    expensesPerPeriod: null,
    expensesPerPeriodByBranch: null,
    allTransactionsPerPeriod: null,
    allTransactionsPerPeriodByBranch: null,
    accountsReceivable: null,
    accountsReceivableByBranch: null,
    accountsPayable: null,
    accountsPayableByBranch: null,
    bestClientValue: null,
    bestClientValueByBranch: null,
    bestClientQuantity: null,
    bestClientQuantityByBranch: null,
    averageTicketPerPeriod: null,
    averageTicketPerPeriodByBranch: null,
    productsInventory: null,
    productsInventoryByBranch: null,
    rawmaterialsInventory: null,
    rawmaterialsInventoryByBranch: null,
    assetsInventory: null,
    assetsInventoryByBranch: null,
    merchandisesInventory: null,
    merchandisesInventoryByBranch: null,
    loading: false,
    errorFinantialIndicator: null,
};

const finantialIndicatorsSlice = createSlice({
    name: 'finantialIndicator',
    initialState,
    reducers: {
        errorFinantialIndicator: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorFinantialIndicator = action.payload;
        },
        getSalesPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.salesPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        getSalesPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.salesPerPeriodByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getExpensesPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.expensesPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        getExpensesPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.expensesPerPeriodByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAllTransactionsPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.allTransactionsPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAllTransactionsPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.allTransactionsPerPeriodByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAccountsReceivableStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsReceivable = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAccountsReceivableByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsReceivableByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAccountsPayableStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsPayable = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAccountsPayableByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.accountsPayableByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientValueStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientValue = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientValueByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientValueByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientQuantityStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientQuantity = action.payload;
            state.errorFinantialIndicator = null;
        },
        getBestClientQuantityByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.bestClientQuantityByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAverageTicketPerPeriodStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.averageTicketPerPeriod = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAverageTicketPerPeriodByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.averageTicketPerPeriodByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getProductsInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.productsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getProductsInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.productsInventoryByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getRawmaterialsInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.rawmaterialsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getRawmaterialsInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.rawmaterialsInventoryByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAssetsInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.assetsInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getAssetsInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.assetsInventoryByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
        getMerchandisesInventoryStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.merchandisesInventory = action.payload;
            state.errorFinantialIndicator = null;
        },
        getMerchandisesInventoryByBranchStart: (state, action: PayloadAction<any  | null>) => {
            state.loading = true;
            state.merchandisesInventoryByBranch = action.payload;
            state.errorFinantialIndicator = null;
        },
    },
});

export const {
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
    getProductsInventoryStart,
    getProductsInventoryByBranchStart,
    getRawmaterialsInventoryStart,
    getRawmaterialsInventoryByBranchStart,
    getAssetsInventoryStart,
    getAssetsInventoryByBranchStart,
    getMerchandisesInventoryStart,
    getMerchandisesInventoryByBranchStart,
} = finantialIndicatorsSlice.actions;
export default finantialIndicatorsSlice.reducer;