import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { patchAsset, getAssets } from '../../../../../redux/User/assetsSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import styles from './styles.module.css';

interface ModalAssetOffProps {
    asset: IAssets;
    onCloseModal: () => void;
}

function ModalAssetOff ({ asset, onCloseModal }: ModalAssetOffProps) {
    const token = Cookies.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const errorAssets = useSelector((state: RootState) => state.assets.errorAssets);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm<IAssets>();

    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ shouldNavigate, setShouldNavigate ] = useState(false);
    
    const isAssetStatusConsult = location.pathname === '/inventories/consult-assets';

    const onSubmit = (values: IAssets) => {
        try {
            const formData = {
                ...values,
            };
            dispatch(patchAsset(asset.id, formData, token));
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
                onCloseModal();
                dispatch(getAssets(token));
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/your-registers');
        }
    }, [ shouldNavigate, navigate ]);


    return (
        <div className="p-3">
            <div className={`${styles.containerModal} `}>
                {isAssetStatusConsult === true && (
                    <p>Si deseas normalizar tu "{asset?.nameItem}", presiona "Enviar"</p>
                )}
                {isAssetStatusConsult === false && (
                    <p>Si deseas dar de baja tu "{asset?.nameItem}" del inventario de activos, selecciona el motivo:</p>
                )}
                {formSubmitted && (
                    <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
                )}
                {errorAssets?.map((error, i) => (
                    <div key={i} className='bg-red-500 my-2 p-2 text-white text-center'>{error}</div>
                ))}
                <form onSubmit={handleSubmit(onSubmit)} >
                    {isAssetStatusConsult === false && (
                        <div>
                            <div>
                                <label>Selecciona el motivo</label>
                                <select
                                    {...register('inventoryOff', { required: true })}
                                    className={`${styles.info} p-2 border rounded border-secundary`}
                                >
                                    <option value=''>Seleccione una opción</option>
                                    <option value='Activo en uso'>Activo en uso</option>
                                    <option value='Activo en reposo'>Activo en reposo</option>
                                    <option value='Dañado'>Dañado</option>
                                    <option value='Donado'>Donado</option>
                                    <option value='Desechado'>Desechado</option>
                                    <option value='Vendido'>Vendido</option>
                                </select>
                                {errors.inventoryOff && (
                                    <p className='text-danger'>Este dato es requerido</p>
                                )}
                            </div>

                            <div className='mt-3'>
                                <label>Selecciona la cantidad</label>
                                <select
                                    {...register('inventory', { required: true })}
                                    className={`${styles.info} p-2 border rounded border-secundary`}
                                >
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                                {errors.inventory && (
                                    <p className='text-danger'>La cantidad es requerida</p>
                                )}
                            </div>
                        </div>
                    )}
                    {isAssetStatusConsult === true && (
                        <div>
                            <select
                                {...register('inventoryOff', { required: true })}
                                className={`${styles.info} p-2 border rounded border-secundary`}
                            >
                                <option value='Activo en uso'>Normalizar</option>
                            </select>
                            {errors.inventoryOff && (
                                <p className='text-danger'>Este dato es requerido</p>
                            )}
                        </div>
                    )}
                    <div className={` d-flex mt-3`}>
                        <button className={styles.buttonSubmit} type='submit' >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAssetOff;