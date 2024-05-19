/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postBranch, getBranches } from '../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../types/User/branch.types';
import NavBar from '../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../components/Platform/Footer/Footer';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import CreateManyBranches from '../../../../../components/Platform/02Branch/CreateManyBranches/CreateManyBranches';
import styles from './styles.module.css';

interface CreateBranchProps {
    onCreateBranch : () => void;
}

function CreateBranchPage({ onCreateBranch }: CreateBranchProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    
    // Utiliza useSelector para obtener la información del usuario del estado de Redux
    const errorBranch = useSelector((state: RootState) => state.branch.errorBranch);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IBranch>();

    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ shouldNavigate, setShouldNavigate ] = useState(false);
    const [ showCancelModal, setShowCancelModal ] = useState(false);

    const onCloseBranchModal = () => {
        setShowCancelModal(false);
    };

    const [ selectedDepartment, setSelectedDepartment ] = useState('');
    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedCodeDane, setSelectedCodeDane ] = useState('');
    const [ selectedsubregionCodeDane, setSelectedsubregionCodeDane ] = useState('');
    const [ resetDepartmenAndCity, setResetDepartmenAndCity ] = useState(false);    //Estado para resetear el componente "DepartmenAndCity" luego de crear el registro
    // Función para manejar los datos seleccionados del departamento y los municipios
    const handleSelectDepartmentCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedsubregionCodeDane(subregionCodeDane);
    };
    
    const onSubmit = async (values: IBranch) => {
        try {
            const branchData = {
                ...values,
                department: selectedDepartment,
                city: selectedCity,
                codeDane: selectedCodeDane,
                subregionCodeDane: selectedsubregionCodeDane,
            } as IBranch;
            await dispatch(postBranch(branchData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getBranches(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
                setResetDepartmenAndCity(true);
                onCreateBranch();
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
            navigate('/branches');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h2 className={`${styles.subtitle} text-center`}>Crea tus Sedes</h2>
                        <p>Acá podrás crear tus sedes, que son las unidades de negocio que tienes abiertas, cada colaborador, activo, mercancía, producto, etc, estará ligado a cada sede, de esta forma se te facilitará el entendimiento de tu negocio en aspectos como ingresos, inventarios y demás</p>
                        
                        <div className="d-flex">
                            <button className={`${styles.button__Detail} m-auto border-0 rounded text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus sedes de forma masiva</button>
                        </div>
                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title>Crea tus sedes de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyBranches
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseBranchModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {errorBranch?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Nombre de la Sede</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('nameBranch', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Nombre de la Sede'
                                    />
                                    {errors.nameBranch && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la sede es requerido</p>
                                    )}
                                </div>
                            </div>
                            <DepartmenAndCity
                                onSelect={handleSelectDepartmentCity}
                                reset={resetDepartmenAndCity} // Pasar el estado de reset al componente DepartmenAndCity
                            />
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Dirección de la Sede</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('addressBranch', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Dirección de la Sede'
                                    />
                                    {errors.addressBranch && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La dirección de la Sede es requerida</p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Email de la Sede</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="email"
                                        {...register('contactEmailBranch', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Email de la Sede'
                                    />
                                    {errors.contactEmailBranch && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El email de la Sede es requerido</p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Número telefónico de la Sede</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('contactPhoneBranch', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Número telefónico de contacto de la Sede'
                                    />
                                    {errors.contactPhoneBranch && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número telefónico de contacto de la Sede es requerido</p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Nombre del gerente de la Sede</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('nameManagerBranch', { required: true })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Nombre del gerente de la Sede'
                                        />
                                        {errors.nameManagerBranch && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre del gerente de la Sede es requerido</p>
                                        )}
                                    </div>
                                </div>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Apellido del gerente de la Sede</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('lastNameManagerBranch', { required: true })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Apellido del gerente de la Sede'
                                        />
                                        {errors.lastNameManagerBranch && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El apellido del gerente de la Sede es requerido</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Tipo de identificación del Gerente de la Sede</h6>
                                <div className={styles.container__Input}>
                                    <select
                                        {...register('typeDocumentIdManager', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                    >
                                        <option value='Cédula de Ciudadanía'>Cédula de Ciudadanía</option>
                                        <option value='Cédula de Extranjería'>Cédula de Extranjería</option>
                                        <option value='Pasaporte'>Pasaporte</option>
                                    </select>
                                    {errors.typeDocumentIdManager && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de identidad del Gerente de la Sede es requerido</p>
                                    )}
                                </div>
                            </div>
                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Número de identidad del Gerente de la Sede</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('documentIdManager', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Número de identidad del Gerente de la Sede'
                                    />
                                    {errors.documentIdManager && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad del Gerente de la Sede es requerido</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="d-flex">
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

export default CreateBranchPage;