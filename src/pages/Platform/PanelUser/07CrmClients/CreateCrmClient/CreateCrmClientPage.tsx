/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postCrmClient, getCrmClients } from '../../../../../redux/User/07CrmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/User/crmClient.types';
import NavBar from '../../../../../components/Platform/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../components/Platform/PanelUser/Footer/Footer';
import CreateManyCrmClients from '../../../../../components/Platform/PanelUser/07CrmClients/CreateManyCrmClients/CreateManyCrmClients.tsx';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CreateClientPageProps {
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateCrmClientPage({ addNotification }: CreateClientPageProps) {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorCrmClient = useSelector((state: RootState) => state.crmClient.errorCrmClient);
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICrmClient>();
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseCrmClientModal = () => {
        setShowCancelModal(false);
    };

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

    const onSubmit = async (values: ICrmClient) => {
        try {
            const formData = {
                ...values,
                // entityUserId: userId,
                department: selectedDepartment,
                city: selectedCity,
                codeDane: selectedCodeDane,
                subregionCodeDane: selectedsubregionCodeDane,
            } as ICrmClient;
            await dispatch(postCrmClient(formData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getCrmClients(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
                addNotification('success', 'Cliente creado exitosamente!');
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
            navigate('/crm-clients/consult-crm-clients');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus clientes</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <Link to='/crm-clients/consult-crm-clients' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tus clientes</Link>
                            <div className={`${styles.link__Head_Navigate} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus clientes de forma masiva</div>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus clientes de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyCrmClients
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseCrmClientModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorCrmClient) && errorCrmClient?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Tipo de identificación</h6>
                                <div className={styles.container__Input}>
                                    <select
                                        {...register('typeDocumentId', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        onChange={handleTypeDocumentIdChange}
                                    >
                                        <option value='NIT' translate="no">NIT</option>
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
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Número de identificación</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('documentId')}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='¿Cuál es el número de identificación de tu cliente?'
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
                                            {...register('verificationDigit')}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='¿Cuál es el número de identificación?'
                                        />
                                    </div>
                                </div>
                            </div>

                            {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                                <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                        <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Nombres de tu cliente</h6>
                                        <div className={styles.container__Input}>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className={`${styles.input} p-2 border`}
                                                placeholder='Nombres de tu cliente'
                                            />
                                            {errors.name && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Los nombres de tu cliente son requeridos</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                        <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Apellidos de tu cliente</h6>
                                        <div className={styles.container__Input}>
                                            <input
                                                type="text"
                                                {...register('lastName')}
                                                className={`${styles.input} p-2 border`}
                                                placeholder='Apellidos de tu cliente'
                                            />
                                            {errors.lastName && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Los apellidos de tu cliente son requeridos</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {typeDocumentId === 'NIT' && (
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Nombre de la empresa</h6>
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
                                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Email</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el email?'
                                    />
                                    {errors.email && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El email del cliente es requerido</p>
                                    )}
                                </div>
                            </div>
                    
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Celular o teléfono fijo</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="phone"
                                        {...register('phone', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el celular o teléfono fijo de tu cliente?'
                                        min={0}
                                    />
                                    {errors.phone && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del cliente es requerido</p>
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
                                        {...register('address')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es la dirección?'
                                    />
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

export default CreateCrmClientPage;