import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { patchAsset, getAssets } from '../../../../../redux/User/assetsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import { IInventoryOffAssets } from '../../../../../types/User/InventoryOffItem/iInventoryOffItem.types';
import styles from './styles.module.css';

interface ModalAssetOffProps {
    token: string;
    asset: IAssets;
    onCloseModal: () => void;
}

interface FormValues {
    reason: IInventoryOffAssets['reason'];
    quantity: number;
    description: string;
}

function ModalAssetOff({ token, asset, onCloseModal }: ModalAssetOffProps) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorAssets = useSelector((state: RootState) => state.assets.errorAssets);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const onSubmit = (values: FormValues) => {
        try {
            const formData: Partial<IAssets> = {
                inventoryOff: [
                    {
                        date: new Date(),
                        reason: values.reason,
                        quantity: values.quantity,
                        description: values.description,
                    },
                ],
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
            navigate('/inventories/consult-assets');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className="p-3">
            <div className={`${styles.container__Modal}`}>
                <p>Si deseas dar de baja tu "{asset?.nameItem}" del inventario de activos, selecciona el motivo:</p>

                {formSubmitted && (
                    <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorAssets) && errorAssets?.map((error, i) => (
                    <div key={i} className='bg-red-500 my-2 p-2 text-white text-center'>{error}</div>
                ))}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <h6 className={styles.label}>Selecciona el motivo</h6>
                            <select
                                {...register('reason', { required: true })}
                                className={`${styles.input} p-2 border `}
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value='Dañado'>Dañado</option>
                                <option value='Donado'>Donado</option>
                                <option value='Desechado'>Desechado</option>
                                <option value='Reciclado'>Reciclado</option>
                                <option value='Vendido'>Vendido</option>
                            </select>
                            {errors.reason && (
                                <p className='text-danger'>Este dato es requerido</p>
                            )}
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <h6 className={styles.label}>Selecciona la cantidad</h6>
                            <select
                                {...register('quantity', { required: true, valueAsNumber: true })}
                                className={`${styles.input} p-2 border `}
                            >
                                <option value=''>Seleccione una cantidad</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                            {errors.quantity && (
                                <p className='text-danger'>La cantidad es requerida</p>
                            )}
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <h6 className={styles.label}>Descripción</h6>
                            <input
                                type="text"
                                className={`${styles.input} p-2 border `}
                                {...register('description', { required: true })}
                            />
                            {errors.description && (
                                <p className='text-danger'>La descripción es requerida</p>
                            )}
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAssetOff;