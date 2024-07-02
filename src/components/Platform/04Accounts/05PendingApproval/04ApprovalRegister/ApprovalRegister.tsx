/* eslint-disable react-hooks/exhaustive-deps */
// REDUX
import { useDispatch } from 'react-redux';
import { patchIncomesNotApproved, getIncomesNotApproved } from '../../../../../redux/User/accountsBookSlice/actions';
import type { AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import styles from './styles.module.css';

interface ApprovalRegisterProps {
    token: string;
    idItem: string;
    onCloseModal: () => void;
}
function ApprovalRegister({ token, idItem, onCloseModal }: ApprovalRegisterProps) {
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = async () => {
        try {
            dispatch(patchIncomesNotApproved(idItem, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getIncomesNotApproved(token));
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