import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { patchProduct, getProducts } from '../../../../../redux/User/productSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IProduct, InventoryOffItem } from '../../../../../types/User/products.types';
import styles from './styles.module.css';

interface ModalProductOffProps {
    token: string;
    product: IProduct;
    onCloseModal: () => void;
}

interface FormValues {
    reason: InventoryOffItem['reason'];
    quantity: number;
    description: string;
}

function ModalProductOff({ token, product, onCloseModal }: ModalProductOffProps) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorProduct = useSelector((state: RootState) => state.product.errorProduct);
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        try {
            const formData: Partial<IProduct> = {
                inventoryOff: [
                    {
                        date: new Date(),
                        reason: values.reason,
                        quantity: values.quantity,
                        description: values.description,
                    },
                ],
                inventory: product.inventory - values.quantity, // Resta la cantidad descontada del inventario actual
            };
            dispatch(patchProduct(product.id, formData, token));
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
                onCloseModal();
                dispatch(getProducts(token));
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-products');
        }
    }, [shouldNavigate, navigate]);


    return (
        <div className="p-3">
            <div className={`${styles.container__Modal}`}>
                <p>Si deseas dar de baja tu "{product?.nameItem}" del inventario de activos, selecciona el motivo:</p>

                {formSubmitted && (
                    <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorProduct) && errorProduct?.map((error, i) => (
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

export default ModalProductOff;