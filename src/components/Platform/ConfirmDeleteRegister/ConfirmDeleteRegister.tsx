/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { deleteAsset, getAssets } from '../../../redux/User/assetsSlice/actions';
import { deleteMerchandise, getMerchandises } from '../../../redux/User/merchandiseSlice/actions';
import { deleteProduct, getProducts } from '../../../redux/User/productSlice/actions';
import { deleteRawMaterial, getRawMaterials } from '../../../redux/User/rawMaterialSlice/actions';
import { deleteService, getServices } from '../../../redux/User/serviceSlice/actions';
import { deleteAccountsBook, getAccountsBooksApproved } from '../../../redux/User/accountsBookSlice/actions';
import styles from './styles.module.css';

interface ConfirmDeleteRegisterProps {
    typeRegisterDelete: string;
    idItem: string;
    nameRegister?: string;
    onCloseModal: () => void;
}

function ConfirmDeleteRegister({ typeRegisterDelete, idItem, nameRegister, onCloseModal }: ConfirmDeleteRegisterProps) {
    const token = Cookies.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const [typeDelete, setTypeDelete] = useState('');
    useEffect(() => {
        if (typeRegisterDelete === 'Asset') {
            setTypeDelete(`¿Estas seguro de que quieres eliminar el equipo, herramienta o máquina ${nameRegister}?`)
        } 
        else if (typeRegisterDelete === 'Merchandise') {
            setTypeDelete(`¿Estas seguro de que quieres eliminar la Mercancía ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'Product') {      
            setTypeDelete(`¿Estas seguro de que quieres eliminar el Producto ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'RawMaterial') {  
            setTypeDelete(`¿Estas seguro de que quieres eliminar la Materia Prima ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'Service') {
            setTypeDelete(`¿Estas seguro de que quieres eliminar el Servicio ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'AccountsBook') {
            setTypeDelete('este registro del libro diario')
            setTypeDelete(`¿Estas seguro de que quieres eliminar este registro del libro diario?`)
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
            if (typeRegisterDelete === 'AccountsBook') {
                dispatch(deleteAccountsBook(idItem, token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getAccountsBooksApproved(token));
            }
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar el registro');
        }
    };

    return (
        <div className="p-3">
            <p>{typeDelete}</p>
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onDelete} >Enviar</button>
            </div>  
        </div>
    );
}

export default ConfirmDeleteRegister;