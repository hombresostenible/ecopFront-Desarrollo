import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// REDUX
import { useDispatch } from 'react-redux';
import { deleteAsset, getAssets } from '../../../redux/User/assetsSlice/actions';
import { deleteMerchandise, getMerchandises } from '../../../redux/User/merchandiseSlice/actions';
import { deleteProduct, getProducts } from '../../../redux/User/productSlice/actions';
import { deleteRawMaterial, getRawMaterials } from '../../../redux/User/rawMaterialSlice/actions';
import { deleteService, getServices } from '../../../redux/User/serviceSlice/actions';
import type { AppDispatch } from '../../../redux/store';
import styles from './styles.module.css';

interface ConfirmDeleteRegisterProps {
    typeRegisterDelete: string;
    idItem: string;
    nameRegister: string;
    onCloseModal: () => void;
}

function ConfirmDeleteRegister({ typeRegisterDelete, idItem, nameRegister, onCloseModal }: ConfirmDeleteRegisterProps) {
    const token = Cookies.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const [typeDelete, setTypeDelete] = useState('');
    useEffect(() => {
        if (typeRegisterDelete === 'Asset') {
            setTypeDelete('el Activo')
        } 
        else if (typeRegisterDelete === 'Merchandise') {            
            setTypeDelete('la Mercancia')
        }
        else if (typeRegisterDelete === 'Product') {
            setTypeDelete('el Producto')            
        }
        else if (typeRegisterDelete === 'RawMaterial') {
            setTypeDelete('la Materia Prima')            
        }
        else if (typeRegisterDelete === 'Service') {
            setTypeDelete('el Servicio')
        }
    }, [ typeRegisterDelete ]);

    const onDelete = async () => {
        try {
            if (typeRegisterDelete === 'Asset') {
                dispatch(deleteAsset(idItem, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getAssets(token));
            }
            if (typeRegisterDelete === 'Merchandise') {
                dispatch(deleteMerchandise(idItem, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getMerchandises(token));
            }
            if (typeRegisterDelete === 'Product') {
                dispatch(deleteProduct(idItem, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getProducts(token));
            }
            if (typeRegisterDelete === 'RawMaterial') {
                dispatch(deleteRawMaterial(idItem, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getRawMaterials(token));
            }
            if (typeRegisterDelete === 'Service') {
                dispatch(deleteService(idItem, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getServices(token));
            }
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar el registro');
        }
    };

    return (
        <div className="p-3">
            <p>¿Estas seguro de que quieres eliminar {typeDelete} "{nameRegister}"?</p>
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onDelete} >Enviar</button>
            </div>  
        </div>
    );
}

export default ConfirmDeleteRegister;