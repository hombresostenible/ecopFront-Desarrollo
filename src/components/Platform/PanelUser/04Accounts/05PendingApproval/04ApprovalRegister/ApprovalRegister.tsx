/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../../redux/store';
import { patchIncomesNotApproved, getUnapprovedRecords } from '../../../../../../redux/User/04AccountsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import styles from './styles.module.css';

interface ApprovalRegisterProps {
    token: string;
    idItem: string;
    onCloseModal: () => void;
}
function ApprovalRegister({ token, idItem, onCloseModal }: ApprovalRegisterProps) {
    const dispatch: AppDispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);

    const onSubmit = async () => {
        try {
            dispatch(patchIncomesNotApproved(idItem, token));
            setCurrentPage(1);
            setItemsByPage(20);
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getUnapprovedRecords(token, currentPage, itemsByPage));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al aprobar el registro');
        }
    };

    return (
        <div className="p-3">
            <p>¿Estás seguro de que quieres aprobar este registro?</p>
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onSubmit} >Enviar</button>
            </div>  
        </div>
    );
}

export default ApprovalRegister;