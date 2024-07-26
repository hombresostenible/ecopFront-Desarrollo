/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postCrmSupplier, getCrmSuppliers } from '../../../../redux/User/crmSupplierSlice/actions';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/User/crmSupplier.types';
import styles from './styles.module.css';

interface CreateSupplierProps {
    token: string;
    onCreateComplete: () => void;
    onSupplierCreated: (token: string) => void;
}

function CreateSupplier ({ token, onCreateComplete, onSupplierCreated }:CreateSupplierProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorCrmSupplier = useSelector((state: RootState) => state.crmSupplier.errorCrmSupplier);
    const user = useSelector((state: RootState) => state.user.user);
    
    const { register, handleSubmit, formState: { errors } } = useForm<ICrmSupplier>();

    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (token)
            dispatch(getProfileUser(token));
    }, [ token ]);

    const userId = user?.id;

    const [typeDocumentId, settypeDocumentId] = useState('NIT');
    const handletypeDocumentIdChange = (event: { target: { value: SetStateAction<string> }}) => {
        settypeDocumentId(event.target.value);
    };

    const onSubmit = async (values: ICrmSupplier) => {
        try {
            const formData = {
                ...values,
                entityUserId: userId,
            } as ICrmSupplier;
            dispatch(postCrmSupplier(formData, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getCrmSuppliers(token));
            setFormSubmitted(true);
            onCreateComplete();
            onSupplierCreated(token);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    return (
        <div className={`${styles.container} m-auto d-flex flex-column justify-content-center align-items-center`}>
            <h2 className="text-primary-emphasis text-start">Crea tu proveedor</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} pt-4 position-relative`}>
                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorCrmSupplier) && errorCrmSupplier?.map((error, i) => (
                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                ))}
                
                <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                    <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                        <h6 className={styles.label}>Tipo de identificación</h6>
                        <div className={styles.container__Input}>
                            <select
                                {...register('typeDocumentId', { required: true })}
                                className={`${styles.input} p-2 border`}
                                onChange={handletypeDocumentIdChange}
                            >
                                <option value='NIT'>NIT</option>
                                <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                                <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                                <option value='Pasaporte'>Pasaporte</option>
                            </select>
                            {errors.typeDocumentId && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del usuario es requerido</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                    <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                        <h6 className={styles.label}>No. de identificación</h6>
                        <div className={styles.container__Input}>
                            <input
                                type="number"
                                {...register('documentId', { required: true, setValueAs: (value) => parseFloat(value) })}
                                className={`${styles.input} p-2 border `}
                                placeholder='¿Cuál es el número de identificación?'
                                min={0}
                                onKeyDown={(e) => {
                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {errors.lastName && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                            )}
                        </div>
                    </div>

                    <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                        <h6 className={styles.label}>Dígito de verificación</h6>
                        <div className={styles.container__Input}>
                            <input
                                type="text"
                                {...register('verificationDigit')}
                                className={`${styles.input} p-2`}
                                placeholder='¿Cuál es el número de identificación?'
                            />
                        </div>
                    </div>
                </div>

                {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                    <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                        <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Nombres de tu proveedor</h6>
                            <div className={styles.container__Input}>
                                <input
                                    type="text"
                                    {...register('name')}
                                    className={`${styles.input} p-2`}
                                    placeholder='Nombres de tu proveedor'
                                />
                                {errors.name && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>los nombres de tu proveedor son requeridos</p>
                                )}
                            </div>
                        </div>

                        <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Apellidos de tu proveedor</h6>
                            <div className={styles.container__Input}>
                                <input
                                    type="text"
                                    {...register('lastName')}
                                    className={`${styles.input} p-2`}
                                    placeholder='Apellidos de tu proveedor'
                                />
                                {errors.lastName && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>los apllidos de tu proveedor son requeridos</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {typeDocumentId === 'NIT' && (
                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start`}>
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <div className={styles.container__Input}>
                            <input
                                type="text"
                                {...register('corporateName')}
                                className={`${styles.input} p-2`}
                                placeholder='¿Cuál es el nombre de la empresa?'
                            />
                            {errors.corporateName && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la empresa es requerido</p>
                            )}
                        </div>
                    </div>
                )}

                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start`}>
                    <h6 className={styles.label}>Email</h6>
                    <div className={styles.container__Input}>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className={`${styles.input} p-2`}
                            placeholder='¿Cuál es su email?'
                        />
                        {errors.email && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El email del proveedor es requerido</p>
                        )}
                    </div>
                </div>

                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start`}>
                    <h6 className={styles.label}>Celular o teléfono fijo</h6>
                    <div className={styles.container__Input}>
                        <input
                            type="phone"
                            {...register('phone', { required: true })}
                            className={`${styles.input} p-2`}
                            placeholder='¿Cuál es el celular o teléfono fijo de tu proveedor?'
                            min={0}
                        />
                        {errors.phone && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del proveedor es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-4 d-flex align-items-center justify-content-center">
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateSupplier;