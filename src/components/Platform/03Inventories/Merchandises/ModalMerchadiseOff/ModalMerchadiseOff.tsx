import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { patchMerchandise, getMerchandises } from '../../../../../redux/User/merchandiseSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../types/User/merchandise.types';
import styles from './styles.module.css';

interface ModalMerchadiseOffProps {
    token: string;
    merchandise: IMerchandise;
    onCloseModal: () => void;
}

function ModalMerchadiseOff({ token, merchandise, onCloseModal }: ModalMerchadiseOffProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorMerchandise = useSelector((state: RootState) => state.merchandise.errorMerchandise);


    
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IMerchandise>();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const onSubmit = (values: IMerchandise) => {
        try {
            const formData = {
                ...values,
            };
            dispatch(patchMerchandise(merchandise.id, formData, token));
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
                onCloseModal();
                dispatch(getMerchandises(token));
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-merchandises');
        }
    }, [ shouldNavigate, navigate ]);


    return (
        <div className="p-3">
            <div className={`${styles.containerModal} `}>
                <p>Si deseas dar de baja tu "{merchandise?.nameItem}" del inventario de mercancías, selecciona el motivo:</p>
                {formSubmitted && (
                    <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
                )}
                {errorMerchandise?.map((error, i) => (
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

export default ModalMerchadiseOff;