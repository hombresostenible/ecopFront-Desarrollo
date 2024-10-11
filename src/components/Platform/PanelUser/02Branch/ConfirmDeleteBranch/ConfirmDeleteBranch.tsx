import { useState } from 'react';
import jsCookie from 'js-cookie';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { deleteBranch, getBranches } from '../../../../../redux/User/02BranchSlice/actions';
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
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        try {
            dispatch(deleteBranch(idBranch, token));
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getBranches(token));
            addNotification('delete', 'Sede eliminada exitosamente!');
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar la sede');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3">
            <p>¿Estas seguro de que quieres eliminar la sede "{nameBranch}"?</p>
            <div className="mb-5 d-flex">
                {loading ? 
                    <div className={`${styles.container__Loading} position-relative w-100`}>
                        <button className={`${styles.button__Submit} border-0 mx-auto rounded m-auto text-decoration-none`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Eliminando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' onClick={onDelete}>Enviar</button>
                }
            </div>    
        </div>
    )
}

export default ConfirmDeleteBranch;