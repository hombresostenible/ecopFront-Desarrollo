/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
import { postAsset, getAssets } from '../../../../../../redux/User/assetsSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../../types/User/assets.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import CreateManyAssets from '../../../../../../components/Platform/03Inventories/01Assets/CreateManyAssets/CreateManyAssets';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar.tsx';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

interface CreateAssetPageProps {
    selectedBranchId?: string;
    onCreateComplete?: () => void;
    onAssetCreated?: (idBranch: string, token: string) => void;
}

function CreateAssetsPage({ selectedBranchId, onCreateComplete, onAssetCreated }: CreateAssetPageProps) {
    const navigate = useNavigate();
    const token = jsCookie.get('token') || '';
    
    const dispatch: AppDispatch = useDispatch();
    const errorAssets = useSelector((state: RootState) => state.assets.errorAssets);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IAssets>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    useEffect(() => {
        if (token) dispatch(getBranches(token));
    }, [token]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseAssetModal = () => {
        setShowCancelModal(false);
    };
    
    const [selectedCondition, setSelectedCondition] = useState('Nuevo');
    const handleConditionChange = (value: 'Nuevo' | 'Usado') => {
        setSelectedCondition(value);
        setValue('conditionAssets', value);
    };
    
    const [nameItem, setNameItem] = useState('');
    const handleNameItem = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNameItem(event.target.value);
    };

    const onSubmit = async (values: IAssets) => {
        try {
            const formData = {
                ...values,
                branchId: selectedBranchId || values.branchId, // Usa el branchId pasado como prop si está disponible
                referenceItem: String(values.referenceItem),
                conditionAssets: selectedCondition,
            } as IAssets;

            await dispatch(postAsset(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                dispatch(getAssets(token));
                setFormSubmitted(false);
                if (onCreateComplete) {
                    onCreateComplete();
                } else {
                    setShouldNavigate(true);
                }
                if (onAssetCreated && selectedBranchId) {
                    onAssetCreated(selectedBranchId, token);
                }
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-assets');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar /> 
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus equipos, herramientas o máquinas</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <div className="d-flex">
                                <Link to='/inventories/consult-assets' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tu inventario</Link>
                              </div>
                            <div className={styles.link__Head_Navigate}>
                                <button className={`${styles.button__Bulk_Create} m-auto border-0 text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus activos de forma masiva</button>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus activos de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyAssets
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseAssetModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto d-flex flex-column align-items-center justify-content-center position-relative`}>
                            {Array.isArray(errorAssets) && errorAssets?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                            
                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Selecciona una Sede</p>
                                <select
                                    {...register('branchId', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    defaultValue={selectedBranchId || ''}
                                    disabled={!!selectedBranchId} // Deshabilita el select si se pasa una branchId
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                                {errors.branchId && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La Sede es requerida</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}>Si tiene código de barras ¿Cuál es el código?</p>
                                <input
                                    type="text"
                                    {...register('barCode')}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Código de barras de la equipo, herramienta o maquinaría que quieres registrar'
                                />
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el nombre del equipo, herramienta o maquinaría que vas a registrar? Ej: Computador, Guadaña, torno</p>
                                <input
                                    type="text"
                                    {...register('nameItem', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Nombre de tu equipo, herramienta o maquinaría que quieres registrar'
                                    onChange={handleNameItem}
                                />
                                {errors.nameItem && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre del {nameItem} es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Cuál es la marca de la activo "{nameItem}"? Ej: Lenovo, Steel, Siemens</p>
                                <input
                                    type="text"
                                    {...register('brandItem', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Marca equipo, herramienta o maquinaría quieres registrar'
                                />
                                {errors.brandItem && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La marca del equipo, herramienta o máquina es requerida</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Cuál es la referencia de tu activo "{nameItem}"? Escribe la referencia de tu máquina tal y como la vas a identificar en tu inventario. Ej: IdeaPad 1 Intel Core i5</p>
                                <input
                                    type="text"
                                    {...register('referenceItem', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Referencia o N/A'
                                />
                                {errors.referenceItem && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La referencia del equipo, herramienta o máquina es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el estado del(de la) {nameItem}?</p>
                                <select
                                    {...register('stateAssets', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                >
                                    <option value=''>Seleccione una opción</option>
                                    <option value='Funciona correctamente'>Funciona correctamente</option>
                                    <option value='Funciona requiere mantenimiento'>Funciona bien pero requiere pronto mantenimiento</option>
                                    <option value='Dañada requiere cambio'>Dañada y requiere cambio</option>
                                    <option value='Dañada requiere reparacion'>Dañada y requiere reparación</option>
                                </select>
                                {errors.stateAssets && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El estado de la máquina es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Tu activo "{nameItem}" lo(la) compraste nuevo(a) o usado(a)?</p>
                                <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center border rounded`}>
                                    <div
                                        className={`${styles.condition__Option} ${selectedCondition === 'Nuevo' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleConditionChange('Nuevo')}
                                    >
                                        Nuevo
                                    </div>
                                    <div
                                        className={`${styles.condition__Option} ${selectedCondition === 'Usado' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleConditionChange('Usado')}
                                    >
                                        Usado
                                    </div>
                                    {errors.conditionAssets && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Hoy siendo la primer vez que registras información, ¿Cuántos activos de este tipo tienes en el inventario?</p>
                                <input
                                    type="number"
                                    {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Tu inventario acá'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.inventory && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El inventario es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el precio de compra antes de impuestos?</p>
                                <input
                                    type="number"
                                    {...register('purchasePriceBeforeTax', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Precio de compra del equipo, herramienta o máquina'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.purchasePriceBeforeTax && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio de compra antes de impuestos es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el IVA del equipo, herramienta o máquina?</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border`}
                                    {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value={0}>0 %</option>
                                    <option value={5}>5 %</option>
                                    <option value={19}>19 %</option>
                                </select>
                            </div>

                            <div className="mb-5 d-flex align-items-center justify-content-center">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>

                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                        </form>
                    </div>
                    {!onCreateComplete && <Footer />}
                </div>
            </div>
        </div>
    );
}

export default CreateAssetsPage;