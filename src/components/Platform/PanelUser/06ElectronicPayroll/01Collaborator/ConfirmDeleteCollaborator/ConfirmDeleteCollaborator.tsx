// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../../redux/store';
import { deleteUserPlatform, getUsersPlatform } from '../../../../../../redux/User/userPlatformSlice/actions';

interface ConfirmDeleteCollaboratorProps {
    token: string;
    idUserPlatform: string;
    nameUserPlatform: string;
    onCloseModal: () => void;
}

function ConfirmDeleteCollaborator({ token, idUserPlatform, nameUserPlatform, onCloseModal }: ConfirmDeleteCollaboratorProps) {
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteUserPlatform(idUserPlatform, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getUsersPlatform(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar tu colaborador');
        }
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p>¿Estas seguro de que quieres eliminar tu colaborador "{nameUserPlatform}"?</p>
            <button className='btn btn-primary' onClick={onDelete}>Aceptar</button>     
        </div>
    );
}

export default ConfirmDeleteCollaborator;