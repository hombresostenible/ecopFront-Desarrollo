import jsCookie from 'js-cookie';
//REDUX
import { useDispatch } from 'react-redux';
import { deleteBranch, getBranches } from '../../../../redux/User/branchSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import styles from './styles.module.css';

interface ConfirmDeleteBranchProps {
    id: string;
    nameBranch: string;
    onCloseModal: () => void;
    
}

function ConfirmDeleteBranch ({ id, nameBranch, onCloseModal }: ConfirmDeleteBranchProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteBranch(id, token));
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