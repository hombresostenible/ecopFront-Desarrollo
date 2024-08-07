/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postCrmSupplier, getCrmSuppliers } from '../../../../../redux/User/crmSupplierSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../../types/User/crmSupplier.types';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

function CreateCrmSupplierPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const errorCrmSupplier = useSelector((state: RootState) => state.crmSupplier.errorCrmSupplier);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICrmSupplier>();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCodeDane, setSelectedCodeDane] = useState('');
    const [selectedsubregionCodeDane, setSelectedsubregionCodeDane] = useState('');
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);    //Estado para resetear el componente "DepartmenAndCity" luego de crear el registro
    // Función para manejar los datos seleccionados del departamento y los municipios
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedsubregionCodeDane(subregionCodeDane);
    };
    
    const [typeDocumentId, setTypeDocumentId] = useState('NIT');
    const handleTypeDocumentIdChange = (event: { target: { value: SetStateAction<string> }}) => {
        setTypeDocumentId(event.target.value);
    };

    const onSubmit = async (values: ICrmSupplier) => {
        try {
            const formData = {
                ...values,
                // entityUserId: userId,
                department: selectedDepartment,
                city: selectedCity,
                codeDane: selectedCodeDane,
                subregionCodeDane: selectedsubregionCodeDane,
            } as ICrmSupplier;
            
            await dispatch(postCrmSupplier(formData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getCrmSuppliers(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
                setResetDepartmenAndCity(true);
                setTimeout(() => {
                    setResetDepartmenAndCity(false);
                }, 10); // Se reinicia después de un corto período para asegurarse de que el reset haya tenido efecto
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/crm-suppliers/consult-crm-suppliers');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Proveedores</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorCrmSupplier) && errorCrmSupplier?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Tipo de identificación</h6>
                                <div className={styles.container__Input}>
                                    <select
                                        {...register('typeDocumentId', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        onChange={handleTypeDocumentIdChange}
                                    >
                                        <option value='NIT'>NIT</option>
                                        <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                                        <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                                        <option value='Pasaporte'>Pasaporte</option>
                                    </select>
                                    {errors.typeDocumentId && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del proveedor es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Número de identificación</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('documentId')}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='¿Cuál es el número de identificación de tu proveedor?'
                                        />
                                        {errors.documentId && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                                        )}
                                    </div>
                                </div>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Dígito de verificación</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('verificationDigit', { required: true })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='¿Cuál es el número de identificación?'
                                        />
                                        {errors.verificationDigit && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El dígito de verificación es requerido</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                                <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                        <h6 className={styles.label}>Nombres de tu proveedor</h6>
                                        <div className={styles.container__Input}>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className={`${styles.input} p-2 border`}
                                                placeholder='Nombres de tu proveedor'
                                            />
                                            {errors.name && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Los nombres de tu proveedor son requeridos</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                        <h6 className={styles.label}>Apellidos de tu proveedor</h6>
                                        <div className={styles.container__Input}>
                                            <input
                                                type="text"
                                                {...register('lastName')}
                                                className={`${styles.input} p-2 border`}
                                                placeholder='Apellidos de tu proveedor'
                                            />
                                            {errors.lastName && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Los apellidos de tu proveedor son requeridos</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {typeDocumentId === 'NIT' && (
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Nombre de la empresa</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('corporateName')}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='¿Cuál es el nombre de la empresa?'
                                        />
                                        {errors.corporateName && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la empresa es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Email</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el email?'
                                    />
                                    {errors.email && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El email del proveedor es requerido</p>
                                    )}
                                </div>
                            </div>
                    
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Celular o teléfono fijo</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="phone"
                                        {...register('phone', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el celular o teléfono fijo de tu proveedor?'
                                        min={0}
                                    />
                                    {errors.phone && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del proveedor es requerido</p>
                                    )}
                                </div>
                            </div>

                            <DepartmenAndCity
                                onSelect={handleSelectDepartmentAndCity}
                                reset={resetDepartmenAndCity}
                            />

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Dirección</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('address', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es la dirección?'
                                    />
                                    {errors.address && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La dirección de tu proveedor es requerida</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default CreateCrmSupplierPage;