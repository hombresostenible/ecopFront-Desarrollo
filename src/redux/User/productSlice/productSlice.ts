import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../types/User/products.types';

interface ProductState {
    product: IProduct | IProduct[] | null;
    loading: boolean;
    errorProduct: string[] | null;
}

const initialState: ProductState = {
    product: null,
    loading: false,
    errorProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productData: (state, action: PayloadAction<IProduct | null>) => {
            state.loading = false;
            state.product = action.payload;
        },
        errorProduct: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorProduct = action.payload;
        },
        postProductStart: (state, action: PayloadAction<IProduct  | null>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        postManyProductsStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductsStart: (state, action: PayloadAction<IProduct>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductByIdStart: (state, action: PayloadAction<IProduct>) => {
            state.loading = false;
            state.product = action.payload;
            state.errorProduct = null;
        },
        getProductsByBranchStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        putProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
        putManyProductsStart: (state, action: PayloadAction<IProduct[]>) => {
            state.loading = true;
            state.product = action.payload;
            state.errorProduct = null;
        },
        patchProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
        deleteProductStart: (state) => {
            state.loading = true;
            state.errorProduct = null;
        },
    },
});

export const { productData, errorProduct, postProductStart, postManyProductsStart, getProductsStart, getProductByIdStart, getProductsByBranchStart, putProductStart, putManyProductsStart, patchProductStart, deleteProductStart } = productSlice.actions;
export default productSlice.reducer;