import jsCookie from 'js-cookie';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { deleteBranch, getBranches } from '../../../../../redux/User/branchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import styles from './styles.module.css';

interface ConfirmDeleteBranchProps {
    idBranch: string;
    nameBranch: string;
    onCloseModal: () => void;
    addNotification: (type: 'delete' | 'error', message: string) => void;
}

function ConfirmDeleteBranch ({ idBranch, nameBranch, onCloseModal, addNotification }: ConfirmDeleteBranchProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteBranch(idBranch, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getBranches(token));
            addNotification('delete', 'Sede eliminada exitosamente!');
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar la sede');
        }
    };

    return (
        <div className="p-3">
            <p>¿Estas seguro de que quieres eliminar la sede "{nameBranch}"?</p>
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onDelete} >Enviar</button>
            </div>     
        </div>
    )
}

export default ConfirmDeleteBranch;