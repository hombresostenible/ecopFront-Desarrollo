import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { patchRawMaterial, getRawMaterials } from '../../../../../redux/User/rawMaterialSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import styles from './styles.module.css';

interface ModalRawMaterialOffProps {
    token: string;
    rawMaterial: IRawMaterial;
    onCloseModal: () => void;
}

function ModalRawMaterialOff({ token, rawMaterial, onCloseModal }: ModalRawMaterialOffProps) {
    const dispatch: AppDispatch = useDispatch();

    const errorRawMaterial = useSelector((state: RootState) => state.rawMaterial.errorRawMaterial);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IRawMaterial>();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    const onSubmit = (values: IRawMaterial) => {
        try {
            const formData = {
                ...values,
            };
            dispatch(patchRawMaterial(rawMaterial.id, formData, token));
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
                onCloseModal();
                dispatch(getRawMaterials(token));
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-raw-materals');
        }
    }, [ shouldNavigate, navigate ]);
    
    return (
        <div className="p-3">
            <div className={`${styles.containerModal} `}>
                <p>Si deseas dar de baja tu "{rawMaterial?.nameItem}" del inventario de materias primas, selecciona el motivo:</p>
                {formSubmitted && (
                    <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
                )}
                {errorRawMaterial?.map((error, i) => (
                    <div key={i} className='bg-red-500 my-2 p-2 text-white text-center'>{error}</div>
                ))}
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <div>
                            <label>Selecciona el motivo</label>
                            <select
                                {...register('reasonManualDiscountingInventory', { required: true })}
                                className={`${styles.info} p-2 border rounded border-secundary`}
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value='Donado'>Donado</option>
                                <option value='Desechado'>Desechado</option>
                                <option value='Caducado'>Caducado</option>
                                <option value='Perdido'>Perdido</option>
                                <option value='Hurtado'>Hurtado</option>
                            </select>
                            {errors.reasonManualDiscountingInventory && (
                                <p className='text-danger'>Este dato es requerido</p>
                            )}
                        </div>
                        <div className='mt-3'>
                            <label>Selecciona la cantidad</label>
                            <input
                                type="text"
                                {...register('inventory', { required: true })}
                                className={`${styles.inputEdit} p-2 border w-100`}
                                placeholder='Escribe la cantidad a dar de baja'
                            />
                            {errors.inventory && (
                                <p className='text-danger'>La cantidad es requerida</p>
                            )}
                        </div>
                    </div>

                    <div className={` d-flex mt-3`}>
                        <button className={styles.buttonSubmit} type='submit' >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalRawMaterialOff;