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
}

function ConfirmDeleteBranch ({ idBranch, nameBranch, onCloseModal }: ConfirmDeleteBranchProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteBranch(idBranch, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getBranches(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar la sede');
        }
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p>¿Estas seguro de que quieres eliminar la sede "{nameBranch}"?</p>
            <button className={`${styles.buttonSave} border-0 text-center`} onClick={onDelete}>Aceptar</button>     
        </div>
    )
}

export default ConfirmDeleteBranch;