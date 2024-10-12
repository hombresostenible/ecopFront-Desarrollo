import { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { deleteCrmSupplier, getCrmSuppliers } from '../../../../../redux/User/08CrmSupplierSlice/actions';
import styles from './styles.module.css';

interface ConfirmDeleteCRMClientProps {
    token: string;
    idCrmSupplier: string;
    nameClient: string;
    onCloseModal: () => void;
}

function ConfirmDeleteCrmSuppliers({ token, idCrmSupplier, nameClient, onCloseModal }: ConfirmDeleteCRMClientProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            dispatch(deleteCrmSupplier(idCrmSupplier, token));
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getCrmSuppliers(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar tu proveedor');
        }
    };

    return (
        <div className="p-3">
            <p>¿Estas seguro de que quieres eliminar tu proveedor "{nameClient}"?</p>
            <div className="mb-3 d-flex align-items-center justify-content-center">
                {loading ? 
                    <div>
                        <button className={`${styles.button__Submit} mx-auto border-0 rounded`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Eliminando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} m-auto border-0 rounded`} type='submit' onClick={onSubmit}>Eliminar</button>
                }
            </div>
        </div>
    );
}

export default ConfirmDeleteCrmSuppliers;