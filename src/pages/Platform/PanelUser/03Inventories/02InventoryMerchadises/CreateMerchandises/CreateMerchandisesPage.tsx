/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postMerchandise, getMerchandises } from '../../../../../../redux/User/merchandiseSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../../types/User/merchandise.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import CreateManyMerchandises from '../../../../../../components/Platform/03Inventories/02Merchandises/CreateManyMerchandises/CreateManyMerchandises';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CreateMerchandisesPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorMerchandise = useSelector((state: RootState) => state.merchandise.errorMerchandise);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IMerchandise>();
    const { fields, remove } = useFieldArray({
        control,
        name: 'retentions'
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseMerchandiseModal = () => {
        setShowCancelModal(false);
    };

    //Setea el tipo de retención
    const [retention, setShowRetention] = useState('');
    const handleRetentionChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowRetention(event.target.value);
    };

    const onSubmit = async (values: IMerchandise) => {
        try {
            const formData = {
                ...values,
            } as IMerchandise;

            console.log('formData: ', formData)
            await dispatch(postMerchandise(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                dispatch(getMerchandises(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
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
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Mercancías</h1>

                        <Link to='/inventories/consult-merchandises' className={styles.link__Income_Create}>Consulta tu inventario</Link>

                        <div className="d-flex">
                            <button className={`${styles.button__Detail} m-auto border-0 rounded text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus mercancías de forma masiva</button>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus mercancías de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyMerchandises
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseMerchandiseModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorMerchandise) && errorMerchandise?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
                                <div>
                                    <select
                                        {...register('branchId', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                    >
                                        <option value=''>Selecciona una Sede</option>
                                        {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                                            <option key={index} value={branch.id}>
                                                {branch.nameBranch}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.branchId && (
                                        <p className='text-danger'>La Sede es requerida</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el nombre de la mercancía que vas a registrar?</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('nameItem', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Nombre de la mercancía que quieres crear'
                                    />
                                    {errors.nameItem && (
                                        <p className='text-danger'>El nombre de la mercancía es requerido</p>
                                    )}
                                </div>
                            </div>

                            {/* RETENCIONES */}
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >Si está grabado ¿Cuál es el tipo de retención?</p>
                                <div>
                                    {fields.length > 0 && fields.map((field, index) => (
                                        <div key={field.id} className="mb-2">
                                            {/* Selección del tipo de retención */}
                                            <div className="mb-2">
                                                <select
                                                    {...register(`retentions.${index}.retentionType`, { required: true })}
                                                    className={`${styles.input} p-2 border `}
                                                >
                                                    <option value=''>Selecciona un tipo de retención</option>
                                                    <option value='Retefuente'>Retefuente</option>
                                                    <option value='Rete IVA'>Rete IVA</option>
                                                    <option value='Rete ICA'>Rete ICA</option>
                                                    {/* Agrega más opciones según sea necesario */}
                                                </select>
                                                {errors.retentions?.[index]?.retentionType && (
                                                    <p className='text-danger'>El tipo de retención es requerido</p>
                                                )}
                                                <button type="button" onClick={() => remove(index)}>Eliminar</button>
                                            </div>

                                            {/* Selección del porcentaje de retención */}
                                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención de honorarios y consultoría?</p>
                                                <div>
                                                    <select
                                                        {...register(`retentions.${index}.retention`, { required: true })}
                                                        className={`${styles.input} p-2 border `}
                                                        onChange={(e) => handleRetentionChange(e)}
                                                    >
                                                        <option value='retentionFeesConsulting'>retentionFeesConsulting</option>
                                                        <option value='retentionServices'>retentionServices</option>
                                                        <option value='retentionPurchases'>retentionPurchases</option>
                                                        <option value='retentionOthers'>retentionOthers</option>
                                                        <option value='retentionForeignPaymentsDividends'>retentionForeignPaymentsDividends</option>
                                                        <option value='retentionIVA'>retentionIVA</option>
                                                        <option value='retentionICA'>retentionICA</option>
                                                    </select>
                                                    {errors.retentions?.[index]?.retention && (
                                                        <p className='text-danger'>El porcentaje de retención de honorarios y consultoría es requerido</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Porcentaje específico según el tipo de retención */}
                                            {retention === 'retentionFeesConsulting' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención de honorarios y consultoría?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentageFeesConsulting`, { required: true })}
                                                            className={`${styles.input} p-2 border `}
                                                        >
                                                            <option value='2'>2</option>
                                                            <option value='4'>4</option>
                                                            <option value='6'>6</option>
                                                            <option value='10'>10</option>
                                                            <option value='11'>11</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentageFeesConsulting && (
                                                            <p className='text-danger'>El porcentaje de retención de honorarios y consultoría es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {retention === 'retentionServices' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención de servicios?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentageServices`, { required: true })}
                                                            className={`${styles.input} p-2 border `}
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3.5'>3.5</option>
                                                            <option value='4'>4</option>
                                                            <option value='6'>6</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentageServices && (
                                                            <p className='text-danger'>El porcentaje de retención de servicios es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {retention === 'retentionPurchases' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención de compras?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentagePurchases`, { required: true })}
                                                            className={`${styles.input} p-2 border `}
                                                        >
                                                            <option value='0.1'>0.1</option>
                                                            <option value='0.5'>0.5</option>
                                                            <option value='1'>1</option>
                                                            <option value='1.5'>1.5</option>
                                                            <option value='2.5'>2.5</option>
                                                            <option value='3'>3</option>
                                                            <option value='3.5'>3.5</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentagePurchases && (
                                                            <p className='text-danger'>El porcentaje de retención de compras es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {retention === 'retentionOthers' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención de otros?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentageOthers`, { required: true })}
                                                            className={`${styles.input} p-2 border `}
                                                        >
                                                            <option value='2'>2</option>
                                                            <option value='2.5'>2.5</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='7'>7</option>
                                                            <option value='10'>10</option>
                                                            <option value='20'>20</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentageOthers && (
                                                            <p className='text-danger'>El porcentaje de retención de otros es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {retention === 'retentionForeignPaymentsDividends' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención por pagos al exterior y dividendos?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentageForeignPaymentsDividends`, { required: true })}
                                                            className={`${styles.input} p-2 border `}
                                                        >
                                                            <option value='0'>0</option>
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='5'>5</option>
                                                            <option value='7'>7</option>
                                                            <option value='8'>8</option>
                                                            <option value='10'>10</option>
                                                            <option value='15'>15</option>
                                                            <option value='20'>20</option>
                                                            <option value='33'>33</option>
                                                            <option value='35'>35</option>
                                                            <option value='35 + Num. 51'>35 + Num. 51</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentageForeignPaymentsDividends && (
                                                            <p className='text-danger'>El porcentaje de retención por pagos al exterior y dividendos es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {retention === 'retentionIVA' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`{${styles.text} mb-0 p-2}`}>¿Cuál es el porcentaje de retención por IVA?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentageIVA`, { required: true })}
                                                            className={`{${styles.input} p-2 border} `}
                                                        >
                                                            <option value='15'>15</option>
                                                            <option value='100'>100</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentageIVA && (
                                                            <p className='text-danger'>El porcentaje de retención por IVA es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {retention === 'retentionICA' && (
                                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el porcentaje de retención por ICA?</p>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retentionPercentageICA`, { required: true })}
                                                            className={`${styles.input} p-2 border`}
                                                        >
                                                            <option value='0.2'>0.2</option>
                                                            <option value='0.5'>0.5</option>
                                                            <option value='1'>1</option>
                                                            <option value='1.5'>1.5</option>
                                                            <option value='2'>2</option>
                                                            <option value='2.5'>2.5</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                            <option value='6'>6</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retentionPercentageICA && (
                                                            <p className='text-danger'>El porcentaje de retención por ICA es requerido</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
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
    );
}

export default CreateMerchandisesPage;

