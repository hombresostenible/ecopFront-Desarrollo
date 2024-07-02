/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// REDUX
// import { useDispatch, useSelector } from 'react-redux';
// import { patchAddInventoryAsset, getAssets } from '../../../../../redux/User/assetsSlice/actions';
// import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
// import { IAccountsBook } from '../../../../../types/User/accountsBook.types';
// import styles from './styles.module.css';

interface ApprovalRegisterProps {
    token: string;
    idItem: string;
    idBranch: string;
    onCloseModal: () => void;
}
function ApprovalRegister({ token, idItem, idBranch, onCloseModal }: ApprovalRegisterProps) {
    console.log('token: ', token)
    console.log('idItem: ', idItem)
    console.log('idBranch: ', idBranch)
    console.log('onCloseModal: ', onCloseModal)

    return (
        <div>
            
        </div>
    );
}

export default ApprovalRegister;