// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { deleteCrmClient, getCrmClients } from '../../../../../redux/User/crmClientSlice/actions';

interface ConfirmDeleteCRMClientProps {
    token: string;
    idCrmClient: string;
    nameClient: string;
    onCloseModal: () => void;
}

function ConfirmDeleteCRMClient ({ token, idCrmClient, nameClient, onCloseModal }: ConfirmDeleteCRMClientProps) {
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteCrmClient(idCrmClient, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getCrmClients(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar tu cliente');
        }
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p>¿Estas seguro de que quieres eliminar tu cliente "{nameClient}"?</p>
            <button className='btn btn-primary' onClick={onDelete}>Aceptar</button>     
        </div>
    );
}

export default ConfirmDeleteCRMClient;