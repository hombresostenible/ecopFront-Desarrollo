import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBranch } from '../../types/User/branch.types';

interface UserState {
    branch: IBranch | IBranch[] | null;
    loading: boolean;
    errorBranch: string[] | null;
}

const initialState: UserState = {
    //STATES
    branch: null,
    loading: false,
    errorBranch: null,
};

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        //ACTIONS
        branchData: (state, action: PayloadAction<IBranch | null>) => {
            state.loading = false;
            state.branch = action.payload;
        },
        createBranchStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null;
        },
        branchStartErrors: (state, action: PayloadAction<string[]>) => { // Modificado para aceptar un array de cadenas
            state.loading = false;
            state.errorBranch = action.payload;
        },
        createManyBranchStart: (state, action: PayloadAction<IBranch[]>) => { // Modificado para aceptar un array de IBranch como payload
            state.loading = true;
            state.branch = action.payload; // Asigna el array de sedes al estado de errorBranch
        },
        getBranchesStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = true;
            state.branch = action.payload;
            state.errorBranch = null; // Limpia cualquier error previo al obtener las sucursales
        },
        getBranchStart: (state, action: PayloadAction<IBranch>) => {
            state.loading = false; // Establece el estado de carga como falso una vez que se obtiene la sucursal
            state.branch = action.payload;
            state.errorBranch = null; // Limpia cualquier error previo al obtener la sucursal
        },
        putBranchStart: (state) => { // Modificado para no esperar un payload
            state.loading = true;
            state.errorBranch = null;
        },
        deleteBranchStart: (state) => { // Modificado para no esperar un payload
            state.loading = true;
            state.errorBranch = null;
        },
    },
});

export const { branchData, createBranchStart, branchStartErrors, createManyBranchStart, getBranchesStart, getBranchStart, putBranchStart, deleteBranchStart } = branchSlice.actions;
export default branchSlice.reducer;