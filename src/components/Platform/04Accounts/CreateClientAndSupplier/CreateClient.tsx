/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postCrmClient } from '../../../../redux/User/crmClientSlice/actions';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../types/User/crmClient.types';
import styles from './styles.module.css';

interface CreateClientProps {
    token: string;
    onCreateComplete: () => void;
    onClientCreated: (token: string) => void;
}

function CreateClient ({ token, onCreateComplete, onClientCreated }:CreateClientProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorCrmClient = useSelector((state: RootState) => state.crmClient.errorCrmClient);
    const user = useSelector((state: RootState) => state.user.user);

    const { register, handleSubmit, formState: { errors } } = useForm<ICrmClient>();

    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (token)
            dispatch(getProfileUser(token));
    }, [ token ]);
  
    const userId = user?.id;

    const [typeDocumentId, settypeDocumentId] = useState('Cedula de Ciudadania');
    const handletypeDocumentIdChange = (event: { target: { value: SetStateAction<string> }}) => {
        settypeDocumentId(event.target.value);
    };

    const onSubmit = (values: ICrmClient) => {
        try {
            const formData = {
                ...values,
                entityUserId: userId,
            } as ICrmClient;
            dispatch(postCrmClient(formData, token));
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
                <h2 className="text-primary-emphasis text-start">Crea tu cliente</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                    {formSubmitted && (
                        <div className={`${styles.alertSuccess} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                    )}
                    {errorCrmClient?.map((error, i) => (
                        <div key={i} className={`${styles.alertDanger} text-center position-absolute alert-danger`}>{error}</div>
                    ))}

                    <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                        <div className={`d-flex flex-column align-items-start justify-content-start`}>
                            <h6 className={styles.label}>Tipo de identificación</h6>
                            <div className={styles.containerInput}>
                                <select
                                    {...register('typeDocumentId', { required: true })}
                                    className={`${styles.input} p-2 border rounded form-control`}
                                    onChange={handletypeDocumentIdChange}
                                >
                                    <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                                    <option value='NIT'>NIT</option>
                                    <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                                    <option value='Pasaporte'>Pasaporte</option>
                                </select>
                                {errors.typeDocumentId && (
                                    <p className='text-danger'>El tipo de documento del usuario es requerido</p>
                                )}
                            </div>
                        </div>
                        <div className={` d-flex flex-column align-items-start justify-content-start`}>
                            <h6 className={styles.label}>Número de identificación</h6>
                            <div className={styles.containerInput}>
                                <input
                                    type="text"
                                    {...register('documentId', { required: true })}
                                    className={`${styles.input} p-2 border rounded form-control`}
                                    placeholder='¿Cuál es tu número de identificación?'
                                />
                                {errors.documentId && (
                                    <p className='text-danger'>El número de identidad es requerido</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                        <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                            <div className={`d-flex flex-column align-items-start justify-content-start`}>
                                <h6 className={styles.label}>Nombres de tu cliente</h6>
                                <div className={styles.containerInput}>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        className={`${styles.input} p-2 border rounded form-control`}
                                        placeholder='Nombres de tu cliente'
                                    />
                                    {errors.name && (
                                        <p className='text-danger'>los nombres de tu cliente son requeridos</p>
                                    )}
                                </div>
                            </div>
                            <div className={` d-flex flex-column align-items-start justify-content-start`}>
                                <h6 className={styles.label}>Apellidos de tu cliente</h6>
                                <div className={styles.containerInput}>
                                    <input
                                        type="text"
                                        {...register('lastName')}
                                        className={`${styles.input} p-2 border rounded form-control`}
                                        placeholder='Apellidos de tu cliente'
                                    />
                                    {errors.lastName && (
                                        <p className='text-danger'>los apllidos de tu cliente son requeridos</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {typeDocumentId === 'NIT' && (
                        <div className={`${styles.containerInfo} d-flex flex-column align-items-start justify-content-start`}>
                            <h6 className={styles.label}>Nombre de la empresa</h6>
                            <div className={styles.containerInput}>
                                <input
                                    type="text"
                                    {...register('corporateName')}
                                    className={`${styles.input} p-2 border rounded form-control`}
                                    placeholder='¿Cuál es el nombre de la empresa?'
                                />
                                {errors.corporateName && (
                                    <p className='text-danger'>El nombre de la empresa es requerido</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className={`${styles.containerInfo} d-flex flex-column align-items-start justify-content-start`}>
                        <h6 className={styles.label}>Email</h6>
                        <div className={styles.containerInput}>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className={`${styles.input} p-2 border rounded form-control`}
                                placeholder='¿Cuál es tu email?'
                            />
                            {errors.email && (
                                <p className='text-danger'>El email del usuario es requerido</p>
                            )}
                        </div>
                    </div>

                    <div className={`${styles.containerInfo} d-flex flex-column align-items-start justify-content-start`}>
                        <h6 className={styles.label}>Celular o teléfono fijo</h6>
                        <div className={styles.containerInput}>
                            <input
                                type="phone"
                                {...register('phone', { required: true })}
                                className={`${styles.input} p-2 border rounded form-control`}
                                placeholder='¿Cuál es el celular o teléfono fijo de tu oficina principal?'
                                min={0}
                            />
                            {errors.phone && (
                                <p className='text-danger'>El celular del usuario es requerido</p>
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

export default CreateClient;