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
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteCrmSupplier(idCrmSupplier, token));
            // Simulamos un delay de la API
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
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onDelete} >Enviar</button>
            </div>  
        </div>
    );
}

export default ConfirmDeleteCrmSuppliers;