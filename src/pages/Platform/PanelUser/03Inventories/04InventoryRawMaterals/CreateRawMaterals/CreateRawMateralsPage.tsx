/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postRawMaterial, getRawMaterials } from '../../../../../../redux/User/rawMaterialSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import CreateManyRawMaterals from '../../../../../../components/Platform/03Inventories/04RawMaterials/CreateManyRawMaterials/CreateManyRawMaterals';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from './styles.module.css';

interface CreateRawMateralPageProps {
    selectedBranchId?: string;
    onCreateComplete?: () => void;
    onRawMaterialCreated?: (idBranch: string, token: string) => void;
}

function CreateRawMateralsPage({ selectedBranchId, onCreateComplete, onRawMaterialCreated }: CreateRawMateralPageProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    // Estados de Redux
    const errorRawMaterial = useSelector((state: RootState) => state.rawMaterial.errorRawMaterial);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, setValue, formState: { errors }, reset, control, watch } = useForm<IRawMaterial>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'retentions',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseRawMaterialModal = () => {
        setShowCancelModal(false);
    };

    //Setea si el producto aumentará de forma periódica en el inventario
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

    //Setea si la materia prima está empacada
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
    
    //IVA AIU
    const [showIvaAiu, setShowIvaAiu] = useState('No');
    const handleIvaAiuChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowIvaAiu(event.target.value);
    };

    const onSubmit = (values: IRawMaterial) => {
        try {
            if (values.packaged === 'No') {
                values.primaryPackageType = undefined;
            }

            const formData = {
                ...values,
                packaged: selectedpackaged,
                returnablePackaging: selectedReturnablePackaging,
                inventoryIncrease: inventoryIncrease,
                periodicityAutomaticIncrease: periodicityAutomaticIncrease,
            } as IRawMaterial;
            
            dispatch(postRawMaterial(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                dispatch(getRawMaterials(token));
                setFormSubmitted(false);
                if (onCreateComplete) {
                    onCreateComplete();
                } else {
                    setShouldNavigate(true);
                }
                if (onRawMaterialCreated && selectedBranchId) {
                    onRawMaterialCreated(selectedBranchId, token);
                }
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-raw-materals');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus materias primas</h1>
                        
                        <Link to='/inventories/consult-raw-materals' className={styles.link__Income_Create}>Consulta tu inventario</Link>
                        <div className="d-flex">
                            <button className={`${styles.button__Detail} m-auto border-0 text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus materias primas de forma masiva</button>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus materias primas de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyRawMaterals
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseRawMaterialModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorRawMaterial) && errorRawMaterial?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                        
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
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
                                <p className={`${styles.text} mb-0 p-2`}>Si tiene código de barras ¿Cuál es el código?</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('barCode')}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Código de barras de la materia prima que quieres registrar'
                                    />
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el nombre de la materia prima que vas a registrar?</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('nameItem', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Nombre de la materias prima quieres registrar'
                                    />
                                    {errors.nameItem && (
                                        <p className='text-danger'>El nombre de la mercancía es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la marca o referencia de la materia prima?</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('brandItem')}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Marca de la materia prima que quieres registrar'
                                    />
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿En qué unidad de medida desear registrar el inventario de tu materia prima?</p>
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
                                            <option value='Botella'>Botella</option>
                                            <option value='Litro'>Litro</option>
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
                                        <p className='text-danger'>El tipo de empaque de tu materia prima es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >Hoy siendo la primer vez que registras información, ¿Cuánta materia prima tienes en el inventario?</p>
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
                                        <p className='text-danger'>El inventario de la materia prima es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text}`} >¿La materia prima/insumo viene empacada?</p>
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
                                    <p className={`${styles.text} mb-0 p-2`} >Si la materia prima viene empacada ¿Cuál es el tipo de empaque principal?</p>
                                    <div>
                                        <select
                                            {...register('primaryPackageType')}
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
                                        {errors.primaryPackageType && (
                                            <p className='text-danger'>El tipo de empaque de tu materia prima es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿La materia prima tiene empaques adicionales?</p>
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
                                    <p className={`${styles.text} mb-0 p-2`} >Si la materia prima tiene empaques adicionales ¿Cuál es el tipo de empaque?</p>
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
                                            <p className='text-danger'>El tipo de empaque de tu materia prima es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {selectedpackaged === 'Si' && (
                                <div>
                                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <p className={`${styles.text} mb-0 p-2`} >¿El empaque, embalaje o envoltura de tu materia prima es retornable?</p>
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
                                <p className={`${styles.text} mb-0 p-2`} >¿Deseas sumar existencias a tu inventario de manera periódica?</p>
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
                                        <p className="text-center mb-0 p-2">¿Cada cuánto quieres sumar existencias a tu inventario?</p>
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
                                        <p className={`${styles.text} mb-0 p-2`} >Inventario: A futuro, ¿Qué cantidad deseas que se sume "{periodicityAutomaticIncrease}" a tu inventario?</p>
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
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de compra antes de impuestos de cada "{showUnitMeasure}"?</p>
                                <div>
                                    <input
                                        type="number"
                                        {...register('purchasePriceBeforeTax', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Precio de compra de la materia prima'
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

                            {/* RETENCIONES */}
                            {fields.map((field, index) => (
                                <div key={field.id} className={`${styles.container__Retetions} mb-3 p-2 d-flex flex-column align-items-center justify-content-start border rounded`}>
                                    <div className={`${styles.container__Retetion} mb-2 mx-auto`}>
                                        <div className={`${styles.retetion} d-flex gap-2`}>
                                            <div className={`${styles.retention__Type} d-flex flex-column`}>
                                                <label>Tipo de retención:</label>
                                                <select
                                                    {...register(`retentions.${index}.retentionType`, { required: true })}
                                                    className={`${styles.input__Retention} p-2 border`}
                                                >
                                                    <option value=''>Selecciona un tipo de retención</option>
                                                    <option value='No tiene'>No tiene</option>
                                                    <option value='Retefuente'>Retefuente</option>
                                                    <option value='Rete IVA'>Rete IVA</option>
                                                    <option value='Rete ICA'>Rete ICA</option>
                                                </select>
                                                {errors.retentions?.[index]?.retentionType && (
                                                    <p className='text-danger'>El tipo de retención es requerido</p>
                                                )}
                                            </div>

                                            {watch(`retentions.${index}.retentionType`) === 'Rete IVA' && (
                                                <div className='d-flex align-items-end justify-content-center'>
                                                    <select
                                                        {...register(`retentions.${index}.retentionPercentageIVA`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                        className={`${styles.input__Retention} p-2 border`}
                                                    >
                                                        <option value='No aplica'>No aplica</option>
                                                        <option value={15}>15 %</option>
                                                        <option value={100}>100 %</option>
                                                    </select>
                                                    {errors.retentions?.[index]?.retentionPercentageIVA && (
                                                        <p className='text-danger'>El porcentaje de Rete IVA es requerido</p>
                                                    )}
                                                </div>
                                            )}

                                            {watch(`retentions.${index}.retentionType`) === 'Rete ICA' && (
                                                <div className='d-flex align-items-end justify-content-center'>
                                                    <select
                                                        {...register(`retentions.${index}.retentionPercentageICA`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                        className={`${styles.input__Retention} p-2 border`}
                                                    >
                                                        <option value='No aplica'>No aplica</option>
                                                        <option value={2}>2 %</option>
                                                        <option value={3.4}>3.4 %</option>
                                                        <option value={4.14}>4.14 %</option>
                                                        <option value={5}>5 %</option>
                                                        <option value={6.9}>6.9 %</option>
                                                        <option value={8}>8 %</option>
                                                        <option value={9.66}>9.66 %</option>
                                                        <option value={11.04}>11.04 %</option>
                                                        <option value={13.8}>13.8 %</option>
                                                    </select>
                                                    {errors.retentions?.[index]?.retentionPercentageICA && (
                                                        <p className='text-danger'>El porcentaje de Rete ICA es requerido</p>
                                                    )}
                                                </div>
                                            )}

                                            {watch(`retentions.${index}.retentionType`) === 'Retefuente' && (
                                                <div className='d-flex align-items-end justify-content-center gap-2'>
                                                    <div>
                                                        <select
                                                            {...register(`retentions.${index}.retention`, { required: true })}
                                                            className={`${styles.input__Retention} p-2 border`}
                                                        >
                                                            <option value=''>Selecciona una retención</option>
                                                            <option value='retentionFeesConsulting'>Retención de honorarios y consultoría</option>
                                                            <option value='retentionServices'>Retención de servicios</option>
                                                            <option value='retentionPurchases'>Retención de compras</option>
                                                            <option value='retentionOthers'>Otras retenciones</option>
                                                            <option value='retentionForeignPaymentsDividends'>Retención de dividendos del exterior</option>
                                                        </select>
                                                        {errors.retentions?.[index]?.retention && (
                                                            <p className='text-danger'>El tipo de Retefuente es requerido</p>
                                                        )}
                                                    </div>

                                                    {watch(`retentions.${index}.retention`) === 'retentionFeesConsulting' && (
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <select
                                                                {...register(`retentions.${index}.retentionPercentageFeesConsulting`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                                className="p-2 border"
                                                            >
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={2}>2 %</option>
                                                                <option value={4}>4 %</option>
                                                                <option value={6}>6 %</option>
                                                                <option value={10}>10 %</option>
                                                                <option value={11}>11 %</option>
                                                            </select>
                                                            {errors.retentions?.[index]?.retentionPercentageFeesConsulting && (
                                                                <p className='text-danger'>El porcentaje de retención de honorarios y consultoría es requerido</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {watch(`retentions.${index}.retention`) === 'retentionServices' && (
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <select
                                                                {...register(`retentions.${index}.retentionPercentageServices`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                                className="p-2 border"
                                                            >
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={1}>1 %</option>
                                                                <option value={2}>2 %</option>
                                                                <option value={3.5}>3.5 %</option>
                                                                <option value={4}>4 %</option>
                                                                <option value={6}>6 %</option>
                                                            </select>
                                                            {errors.retentions?.[index]?.retentionPercentageServices && (
                                                                <p className='text-danger'>El porcentaje de retención de servicios es requerido</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {watch(`retentions.${index}.retention`) === 'retentionPurchases' && (
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <select
                                                                {...register(`retentions.${index}.retentionPercentagePurchases`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                                className="p-2 border"
                                                            >
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={0.1}>0.1 %</option>
                                                                <option value={0.5}>0.5 %</option>
                                                                <option value={1}>1 %</option>
                                                                <option value={1.5}>1.5 %</option>
                                                                <option value={2.5}>2.5 %</option>
                                                                <option value={3}>3 %</option>
                                                                <option value={3.5}>3.5 %</option>
                                                            </select>
                                                            {errors.retentions?.[index]?.retentionPercentagePurchases && (
                                                                <p className='text-danger'>El porcentaje de retención de compras es requerido</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {watch(`retentions.${index}.retention`) === 'retentionOthers' && (
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <select
                                                                {...register(`retentions.${index}.retentionPercentageOthers`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                                className="p-2 border"
                                                            >
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={2}>2 %</option>
                                                                <option value={2.5}>2.5 %</option>
                                                                <option value={3}>3 %</option>
                                                                <option value={4}>4 %</option>
                                                                <option value={7}>7 %</option>
                                                                <option value={10}>10 %</option>
                                                                <option value={20}>20 %</option>
                                                            </select>
                                                            {errors.retentions?.[index]?.retentionPercentageOthers && (
                                                                <p className='text-danger'>El porcentaje de retención de otros es requerido</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {watch(`retentions.${index}.retention`) === 'retentionForeignPaymentsDividends' && (
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <select
                                                                {...register(`retentions.${index}.retentionPercentageForeignPaymentsDividends`, { required: true, setValueAs: value => parseInt(value, 10) })}
                                                                className="p-2 border"
                                                            >
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={2}>2 %</option>
                                                                <option value={2.5}>2.5 %</option>
                                                                <option value={3}>3 %</option>
                                                                <option value={4}>4 %</option>
                                                                <option value={7}>7 %</option>
                                                                <option value={10}>10 %</option>
                                                                <option value={20}>20 %</option>
                                                            </select>
                                                            {errors.retentions?.[index]?.retentionPercentageForeignPaymentsDividends && (
                                                                <p className='text-danger'>El porcentaje de retención por pagos al exterior y dividendos es requerido</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className={`${styles.container__Icons} pt-4 d-flex align-items-end justify-content-end`}>
                                                <RiDeleteBin6Line
                                                    className={`${styles.button__Delete} `}
                                                    onClick={() => remove(index)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className={`${styles.container__Append} mb-3 d-flex align-items-center justify-content-between`} onClick={() => append({})}>
                                <FaPlus className={`${styles.icon__Plus}` }/>
                                <span>Agregar Retención</span>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de IVA de la mercancía?</p>
                                <div className={styles.containerInput}>
                                    <select
                                        defaultValue={0}
                                        className={`${styles.input} p-2 border `}
                                        {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                                    >
                                        <option value='No aplica'>No aplica</option>
                                        <option value={0}>0 %</option>
                                        <option value={5}>5 %</option>
                                        <option value={19}>19 %</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border">
                                <p className={`${styles.text} mb-0 p-2`} >Si la mercancía está grabada con el impuesto al consumo, elige el porcentaje</p>
                                <select
                                    defaultValue={0}
                                    className={` p-2 border `}
                                    {...register('consumptionTax', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={4}>4 %</option>
                                    <option value={8}>8 %</option>
                                    <option value={16}>16 %</option>
                                </select>
                            </div>

                            <div className='mb-3 d-flex flex-column align-items-center justify-content-center border rounded gap-2'>
                                <div className="mb-3 p-2 d-flex align-items-center justify-content-center">
                                    <p className={`${styles.text} mb-0 p-2`} >¿La mercancía está grabado con IVA AIU?</p>
                                    <div className={styles.containerInput}>
                                        <select
                                            className={`${styles.input} p-2 border `}
                                            onChange={handleIvaAiuChange}
                                        >
                                            <option value={'No'}>No</option>
                                            <option value={'Si'}>Si</option>
                                        </select>
                                    </div>
                                </div>

                                {showIvaAiu === 'Si' && (
                                    <div>
                                        <div className='d-flex'>
                                            <p className={`${styles.text} mb-0 p-2`} >Define el porcentaje de Administración</p>
                                            <input
                                                type="number"
                                                {...register('ivaAiu.administrativePercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                                className={` p-2 border `}
                                                placeholder='Porcentaje de Administración'
                                                min={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            <span>%</span>
                                        </div>

                                        <div className='d-flex'>
                                            <p className={`${styles.text} mb-0 p-2`} >Define el porcentaje de Imprevistos</p>
                                            <input
                                                type="number"
                                                {...register('ivaAiu.unforeseenPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                                className={` p-2 border `}
                                                placeholder='Porcentaje de Imprevistos'
                                                min={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            <span>%</span>
                                        </div>

                                        <div className='d-flex'>
                                            <p className={`${styles.text} mb-0 p-2`} >Define el porcentaje de Utilidad</p>
                                            <input
                                                type="number"
                                                {...register('ivaAiu.utilityPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                                className={` p-2 border `}
                                                placeholder='Porcentaje de Utilidad'
                                                min={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            <span>%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de compra antes de impuestos de cada "{showUnitMeasure}"?</p>
                                <div>
                                    <input
                                        type="number"
                                        {...register('purchasePriceBeforeTax', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Precio de compra de la mercancía'
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
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de venta?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('sellingPrice', { required: true, setValueAs: (value) => parseFloat(value) })}
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

export default CreateRawMateralsPage;