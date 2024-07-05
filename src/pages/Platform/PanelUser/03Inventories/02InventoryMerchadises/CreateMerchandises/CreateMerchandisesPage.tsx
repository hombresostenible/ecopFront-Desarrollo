/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
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
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IMerchandise>();
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

    //Setea el nombre del artículo
    const [nameItem, setNameItem] = useState('');
    const handleNameItem = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNameItem(event.target.value);
    };

    //Setea si el artículo aumentará de forma periódica en el inventario
    const [inventoryIncrease, setInventoryIncrease] = useState('Si');
    const [periodicityAutomaticIncrease, setPeriodicityAutomaticInventoryIncrease] = useState<string | undefined>(undefined);
    const handleInventoryIncrease = (value: 'Si' | 'No') => {
        setInventoryIncrease(value);
        setPeriodicityAutomaticInventoryIncrease(undefined)
        setValue('inventoryIncrease', value);
    };

    //Setea la periodicidad en la que se aumentará el inventario
    const handlePeriodicityAutomaticInventoryIncrease = (value: string) => {
        setPeriodicityAutomaticInventoryIncrease(value);
    };
    
    //Setea si la mercancía está empacada
    const [selectedpackaged, setSelectedpackaged] = useState('Si');
    const handlePackagedChange = (value: 'Si' | 'No') => {
        setSelectedpackaged(value);
        setValue('packaged', value);
    };

    //Setea el valor 'Si' o 'No' en la propiedad "returnablePackaging"
    const [selectedReturnablePackaging, setSelectedReturnablePackaging] = useState('Si');
    const handleReturnablePackagingChange = (value: 'Si' | 'No') => {
        setSelectedReturnablePackaging(value);
        setValue('returnablePackaging', value);
    };

    //Setea la unidad de medida
    const [showUnitMeasure, setShowUnitMeasure] = useState('');
    const handleUnitMeasureChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowUnitMeasure(event.target.value);
    };

    //Setea el valor 'Si' o 'No' en la propiedad "individualPackaging"
    const [selectedIndividualPackaging, setSelectedIndividualPackaging] = useState('Si');
    const handleIndividualPackagingChange = (value: 'Si' | 'No') => {
        setSelectedIndividualPackaging(value);
        setValue('individualPackaging', value);
    };

    const onSubmit = async (values: IMerchandise) => {
        try {
            const formData = {
                ...values,
                returnablePackaging: selectedReturnablePackaging,
                individualPackaging: selectedIndividualPackaging,
                packaged: selectedpackaged,
                inventoryIncrease: inventoryIncrease,
                periodicityAutomaticIncrease: periodicityAutomaticIncrease,
            } as IMerchandise;
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
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
                                </div>
                                <div>
                                    <select
                                        {...register('branchId', { required: true })}
                                        className={`${styles.input} p-2 border `}
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
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>Si la mercancía tiene código de barras ¿Cuál es el código?</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('barCode')}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Código de barras de la mercancía que quieres registrar'
                                    />
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el nombre de la mercancía que vas a registrar?</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('nameItem', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        onChange={handleNameItem}
                                        placeholder='Nombre de la mercancía que quieres crear'
                                    />
                                    {errors.nameItem && (
                                        <p className='text-danger'>El nombre de la mercancía es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la marca o referencia de la mercancía "{nameItem}"?</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('brandItem')}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Marca de la mercancía que quieres registrar'
                                    />
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿En qué unidad de medida desear registrar el inventario de tu mercancía?</p>
                                </div>
                                <div>
                                    <select
                                        {...register('unitMeasure', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        onChange={handleUnitMeasureChange}
                                    >                                         
                                        <option value=''>Selecciona una unidad de medida</option>
                                        <optgroup label="Unidades">
                                            <option value='Unidades'>Unidades</option>
                                            <option value='Ristra'>Ristra</option>
                                            <option value='Decena'>Decena</option>
                                            <option value='Docena'>Docena</option>
                                        </optgroup>
                                        <optgroup label="Líquidos">
                                            <option value='Mililitro'>Mililitro</option>
                                            <option value='Onza'>Onza</option>
                                            <option value='Litro'>Litro</option>
                                            <option value='Botella'>Botella</option>
                                            <option value='Galon'>Galón</option>
                                            <option value='Pimpina'>Pimpina</option>
                                            <option value='Metro cubico'>Metro cúbico</option>
                                        </optgroup>
                                        <optgroup label="Sólidos">
                                            <option value='Miligramo'>Miligramo</option>
                                            <option value='Gramo'>Gramo</option>
                                            <option value='Libra'>Libra</option>
                                            <option value='Kilogramo'>Kilogramo</option>
                                            <option value='Caja'>Caja</option>
                                            <option value='Paca'>Paca</option>
                                            <option value='Arroba'>Arroba</option>
                                            <option value='Bulto'>Bulto</option>
                                            <option value='Saco'>Saco</option>
                                            <option value='Tonelada'>Tonelada</option>
                                        </optgroup>
                                        <optgroup label="longitud">
                                            <option value='Milimetro'>Milimetro</option>
                                            <option value='Centrimetro'>Centrimetro</option>
                                            <option value='Pulgada'>Pulgada</option>
                                            <option value='Metro'>Metro</option>
                                            <option value='Centimetro cuadrado'>Centimetro cuadrado</option>
                                            <option value='Metro cuadrado'>Metro cuadrado</option>
                                        </optgroup>
                                    </select>
                                    {errors.unitMeasure && (
                                        <p className='text-danger'>El tipo de empaque de tu mercancía es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >Hoy siendo la primer vez que registras información, ¿Cuánta mercancía tienes en el inventario?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Tu inventario acá'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.inventory && (
                                        <p className='text-danger'>El inventario de la mercancía es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿La mercancía viene empacada?</p>
                                </div>
                                <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.conditionOption} ${selectedpackaged === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handlePackagedChange('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.conditionOption} ${selectedpackaged === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handlePackagedChange('No')}
                                    >
                                        No
                                    </div>
                                    {errors.packaged && (
                                        <p className='text-danger'>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {selectedpackaged === 'Si' && (
                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                    <div>
                                        <p className={`${styles.text} mb-0 p-2`} >Si la mercancía viene empacada ¿Cuál es el tipo de empaque principal?</p>
                                    </div>
                                    <div>
                                        <select
                                            {...register('primaryPackageType', { required: true })}
                                            className={`${styles.input} p-2 border `}
                                        >
                                            <option value='Ninguno'>Ninguno</option>
                                            <option value='Papel'>Papel</option>
                                            <option value='Papel de archivo'>Papel de archivo</option>
                                            <option value='Carton'>Cartón</option>
                                            <option value='Aluminio'>Aluminio</option>
                                            <option value='Plegadiza'>Plegadiza</option>
                                            <option value='Vidrio'>Vidrio</option>
                                            <option value='PET / PETE Polietileno Tereftalato'>PET / PETE Polietileno Tereftalato</option>
                                            <option value='HDPE Polietileno de alta densidad'>HDPE Polietileno de alta densidad</option>
                                            <option value='PVC Policloruro de Vinilo'>PVC Policloruro de Vinilo</option>
                                            <option value='LDPE Polietileno de baja densidad'>LDPE Polietileno de baja densidad</option>
                                            <option value='PP Polipropileno'>PP Polipropileno</option>
                                            <option value='PS Poliestireno'>PS Poliestireno</option>
                                            <option value='Otros plasticos (Policarbonato, estireno, nylon)'>Otros plásticos (Policarbonato, estireno, nylon)</option>
                                            <option value='Hierro'>Hierro</option>
                                            <option value='Icopor'>Icopor</option>
                                            <option value='Biodegradable'>Biodegradable</option>
                                            <option value='Plastico de burbujas'>Plástico de burbujas</option>
                                        </select>
                                        {errors.primaryPackageType && (
                                            <p className='text-danger'>La unidad de medida es requerida</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿La mercancía tiene empaques adicionales?</p>
                                </div>
                                <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center border rounded`}>
                                    <div
                                        className={`${styles.conditionOption} ${selectedIndividualPackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleIndividualPackagingChange('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.conditionOption} ${selectedIndividualPackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleIndividualPackagingChange('No')}
                                    >
                                        No
                                    </div>
                                    {errors.individualPackaging && (
                                        <p className='text-danger'>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {selectedIndividualPackaging === 'Si' && (
                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                    <div>
                                        <p className={`${styles.text} mb-0 p-2`} >Si la mercancía tiene empaques adicionales ¿Cuál es el tipo de empaque?</p>
                                    </div>
                                    <div>
                                        <select
                                            {...register('secondaryPackageType', { required: true })}
                                            className={`${styles.input} p-2 border `}                                    
                                        >
                                            <option value='Papel'>Papel</option>
                                            <option value='Papel de archivo'>Papel de archivo</option>
                                            <option value='Carton'>Cartón</option>                                                
                                            <option value='Aluminio'>Aluminio</option>
                                            <option value='Plegadiza'>Plegadiza</option>
                                            <option value='Vidrio'>Vidrio</option>
                                            <option value='PET / PETE Polietileno Tereftalato'>PET / PETE Polietileno Tereftalato</option>                                                
                                            <option value='HDPE Polietileno de alta densidad'>HDPE Polietileno de alta densidad</option>
                                            <option value='PVC Policloruro de Vinilo'>PVC Policloruro de Vinilo</option>
                                            <option value='LDPE Polietileno de baja densidad'>LDPE Polietileno de baja densidad</option>
                                            <option value='PP Polipropileno'>PP Polipropileno</option>
                                            <option value='PS Poliestireno'>PS Poliestireno</option>
                                            <option value='Otros plasticos (Policarbonato, estireno, nylon)'>Otros plásticos (Policarbonato, estireno, nylon)</option>
                                            <option value='Hierro'>Hierro</option>
                                            <option value='Icopor'>Icopor</option>
                                            <option value='Biodegradable'>Biodegradable</option>
                                            <option value='Plastico de burbujas'>Plástico de burbujas</option>
                                        </select>
                                        {errors.secondaryPackageType && (
                                            <p className='text-danger'>El tipo de empaque de tu mercancía es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} `} >¿Cuánt{['Unidades', 'Onza', 'Pimpina', 'Libra', 'Arroba', 'Tonelada'].includes(showUnitMeasure) ? 'as' : 'os'} {showUnitMeasure}{['Unidades'].includes(showUnitMeasure) ? '' : 's'} de "{nameItem}" vienen por cada paquete o presentación?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('quantityPerPackage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Ej: 10'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.quantityPerPackage && (
                                        <p className='text-danger'>El valor en {showUnitMeasure} es requerido</p>
                                    )}
                                </div>
                            </div> */}                            

                            {selectedpackaged === 'Si' && (
                                <div>
                                    

                                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <div>
                                            <p className={`${styles.text} `} >¿El empaque, embalaje o envoltura de tu mercancía es retornable?</p>
                                        </div>
                                        <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                                            <div
                                                className={`${styles.conditionOption} ${selectedReturnablePackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                                onClick={() => handleReturnablePackagingChange('Si')}
                                            >
                                                Si
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${selectedReturnablePackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                                onClick={() => handleReturnablePackagingChange('No')}
                                            >
                                                No
                                            </div>
                                            {errors.returnablePackaging && (
                                                <p className='text-danger'>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿Deseas sumar existencias a tu inventario de manera periódica?</p>
                                </div>
                                <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.conditionOption} ${inventoryIncrease === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleInventoryIncrease('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.conditionOption} ${inventoryIncrease === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleInventoryIncrease('No')}
                                    >
                                        No
                                    </div>
                                    {errors.inventoryIncrease && (
                                        <p className='text-danger'>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {inventoryIncrease === 'Si' && (
                                <div>
                                    <div className="mb-3 p-2 d-flex flex-column align-items-center justify-content-center border rounded">
                                        <div>
                                            <p className="text-center mb-0 p-2">¿Cada cuánto quieres sumar existencias a tu inventario?</p>
                                        </div>
                                        <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center w-100`}>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Diario' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Diario')}
                                            >
                                                Diario
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Semanal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semanal')}
                                            >
                                                Semanal
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Quincenal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Quincenal')}
                                            >
                                                Quincenal
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Mensual' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Mensual')}
                                            >
                                                Mensual
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Bimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Bimestral')}
                                            >
                                                Bimestral
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Trimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Trimestral')}
                                            >
                                                Trimestral
                                            </div>
                                            <div
                                                className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Semestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semestral')}
                                            >
                                                Semestral
                                            </div>
                                            {errors.periodicityAutomaticIncrease && (
                                                <p className='text-danger'>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <div>
                                            <p className={`${styles.text} mb-0 p-2`} >Inventario: A futuro, ¿Cuánto deseas que se sume "{periodicityAutomaticIncrease}" a tu inventario?</p>
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                {...register('automaticInventoryIncrease', { required: true, setValueAs: (value) => parseFloat(value) })}
                                                className={`${styles.input} p-2 border `}
                                                placeholder='Valor numérico de lo que quieres aumentar'
                                                min={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            {errors.automaticInventoryIncrease && (
                                                <p className='text-danger'>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de compra antes de impuestos de cada "{showUnitMeasure}"?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('purchasePriceBeforeTax', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Precio de la mercancía'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.purchasePriceBeforeTax && (
                                        <p className='text-danger'>El el precio de compra antes de impuestos es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div className="px-3">
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el IVA de la mercancía?</p>
                                </div>
                                <div className={styles.containerInput}>
                                    <select
                                        defaultValue={'0'}
                                        className={`${styles.input} p-2 border `}
                                        {...register('IVA', { required: true })}
                                    >
                                        <option value='0'>0 %</option>
                                        <option value='5'>5 %</option>
                                        <option value='19'>19 %</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de venta?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('sellingPrice', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Precio de venta de a mercancía'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.sellingPrice && (
                                        <p className='text-danger'>El precio de venta es requerido</p>
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
    );
}

export default CreateMerchandisesPage;