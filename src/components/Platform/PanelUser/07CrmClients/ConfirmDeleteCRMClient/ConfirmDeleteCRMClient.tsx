// REDUX
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import type { AppDispatch } from '../../../../../redux/store';
import { deleteCrmClient, getCrmClients } from '../../../../../redux/User/07CrmClientSlice/actions';
import styles from './styles.module.css';

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
        <div className="p-3">
            <p>¿Estas seguro de que quieres eliminar tu cliente "{nameClient}"?</p>
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onDelete} >Enviar</button>
            </div>
        </div>
    );
}

export default ConfirmDeleteCRMClient;