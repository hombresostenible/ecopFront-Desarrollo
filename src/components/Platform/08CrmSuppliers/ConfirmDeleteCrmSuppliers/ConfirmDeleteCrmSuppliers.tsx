// REDUX
import { useDispatch } from 'react-redux';
import { deleteCrmSupplier, getCrmSuppliers } from '../../../../redux/User/crmSupplierSlice/actions';
import type { AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
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
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p>¿Estas seguro de que quieres eliminar tu proveedor "{nameClient}"?</p>
            <button className='btn btn-primary' onClick={onDelete}>Aceptar</button>     
        </div>
    );
}

export default ConfirmDeleteCrmSuppliers;