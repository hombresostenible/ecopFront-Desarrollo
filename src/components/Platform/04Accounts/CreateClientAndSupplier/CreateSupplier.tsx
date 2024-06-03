/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postCrmSupplier } from '../../../../redux/User/crmSupplierSlice/actions';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/User/crmSupplier.types';
import styles from './styles.module.css';

interface CreateSupplierProps {
    token: string;
    onCreateComplete: () => void;
    onClientCreated: (token: string) => void;
}

function CreateSupplier ({ token, onCreateComplete, onClientCreated }:CreateSupplierProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorCrmClient = useSelector((state: RootState) => state.crmClient.errorCrmClient);
    const user = useSelector((state: RootState) => state.user.user);
    
    const { register, handleSubmit, formState: { errors } } = useForm<ICrmSupplier>();

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    useEffect(() => {
        if (token)
            dispatch(getProfileUser(token));
    }, [ token ]);

    const userId = user?.id;

    const onSubmit = (values: ICrmSupplier) => {
        try {
            const formData = {
                ...values,
                entityUserId: userId,
            } as ICrmSupplier;
            dispatch(postCrmSupplier(formData, token));
            setFormSubmitted(true);
            onCreateComplete();
            onClientCreated(token);
            setTimeout(() => {
                setFormSubmitted(false);
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    return (
        <div className="mt-2">
            <div className={`${styles.containerForm} d-flex flex-column justify-content-center align-items-center`}>
                <h2 className="text-primary-emphasis text-start">Crea tu proveedor</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formSubmitted && (
                        <div className={`${styles.alertSuccess} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                    )}
                    {errorCrmClient?.map((error, i) => (
                        <div key={i} className={`${styles.alertDanger} text-center position-absolute alert-danger`}>{error}</div>
                    ))}
                    
                    <div className={`${styles.containerInfo} d-flex flex-column align-items-start justify-content-start`}>
                        <h6 className={styles.label}>Nombre completo de tu proveedor</h6>
                        <div className={styles.containerInput}>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className={`${styles.input} p-2 border rounded border-secundary w-100`}
                                placeholder='¿Cuál es el nombre completo de tu proveedor? '
                            />
                            {errors.name && (
                                <p className='text-danger'>El nombre completo de tu proveedor es requerido</p>
                            )}
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                        <div className={`d-flex flex-column align-items-start justify-content-start`}>
                            <h6 className={styles.label}>Tipo de identificación</h6>
                            <div className={styles.containerInput}>
                                <select
                                    {...register('typeDocumentId', { required: true })}
                                    className={`${styles.input} p-2 border rounded border-secundary w-100`}
                                >
                                    <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                                    <option value='NIT'>NIT</option>
                                    <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                                    <option value='Pasaporte'>Pasaporte</option>
                                </select>
                                {errors.typeDocumentId && (
                                    <p className='text-danger'>El tipo de documento del proveedor es requerido</p>
                                )}
                            </div>
                        </div>
                        <div className={` d-flex flex-column align-items-start justify-content-start`}>
                            <h6 className={styles.label}>Número de identificación</h6>
                            <div className={styles.containerInput}>
                                <input
                                    type="text"
                                    {...register('documentId', { required: true })}
                                    className={`${styles.input} p-2 border rounded border-secundary w-100`}
                                    placeholder='¿Cuál es el número de identificación?'
                                />
                                {errors.documentId && (
                                    <p className='text-danger'>El número de identidad es requerido</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.containerInfo} d-flex flex-column align-items-start justify-content-start`}>
                        <h6 className={styles.label}>Email</h6>
                        <div className={styles.containerInput}>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className={`${styles.input} p-2 border rounded border-secundary w-100`}
                                placeholder='¿Cuál es su email?'
                            />
                            {errors.email && (
                                <p className='text-danger'>El email del proveedor es requerido</p>
                            )}
                        </div>
                    </div>

                    <div className={`${styles.containerInfo} d-flex flex-column align-items-start justify-content-start`}>
                        <h6 className={styles.label}>Celular o teléfono fijo</h6>
                        <div className={styles.containerInput}>
                            <input
                                type="phone"
                                {...register('phone', { required: true })}
                                className={`${styles.input} p-2 border rounded border-secundary w-100`}
                                placeholder='¿Cuál es el celular o teléfono fijo de tu proveedor?'
                                min={0}
                            />
                            {errors.phone && (
                                <p className='text-danger'>El celular del proveedor es requerido</p>
                            )}
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <button className={`${styles.buttonSave} border-0`} type='submit' >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSupplier;