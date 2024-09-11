import { configureStore } from '@reduxjs/toolkit';
import accountsBookReducer from './User/accountsBookSlice/accountsBookSlice';
import assetsReducer from './User/assetsSlice/assetsSlice';
import branchReducer from './User/branchSlice/branchSlice';
import crmClientReducer from './User/crmClientSlice/crmClientSlice';
import crmSupplierReducer from './User/crmSupplierSlice/crmSupplierSlice';
import merchandiseReducer from './User/merchandiseSlice/merchandiseSlice';
import productReducer from './User/productSlice/productSlice';
import rawMaterialReducer from './User/rawMaterialSlice/rawMaterialSlice';
import serviceReducer from './User/serviceSlice/serviceSlice';
import userReducer from './User/userSlice/userSlice';
import usersPlatformReducer from './User/userPlatformSlice/userPlatformSlice';
import finantialIndicatorsReducer from './User/indicator/finantialIndicators/finantialIndicatorsSlice';
import itemByBarCodeOrNameReducer from './User/itemBybarCodeOrName/itemByBarCodeOrNameSlice';
import searchItemsReducer from './User/searchItems/searchItemsSlice';
import contactUsReducer from './User/contactUs/contactUsSlice';

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = {
    accountsBook: accountsBookReducer,
    assets: assetsReducer,
    branch: branchReducer,
    crmClient: crmClientReducer,
    crmSupplier: crmSupplierReducer,
    merchandise: merchandiseReducer,
    product: productReducer,
    rawMaterial: rawMaterialReducer,
    service: serviceReducer,
    user: userReducer,
    usersPlatform: usersPlatformReducer,
    finantialIndicators: finantialIndicatorsReducer, // Engloba a todos los slices de indicadores
    itemByBarCodeOrName: itemByBarCodeOrNameReducer,
    searchItems: searchItemsReducer,
    contactUs: contactUsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;