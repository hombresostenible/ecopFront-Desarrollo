/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postAsset, getAssets } from '../../../../../../redux/User/assetsSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../../types/User/assets.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import CreateManyAssets from '../../../../../../components/Platform/03Inventories/Assets/CreateManyAssets/CreateManyAssets';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

interface CreateAssetPageProps {
    selectedBranchId?: string;
    onCreateComplete?: () => void;
    onAssetCreated?: (idBranch: string, token: string) => void;
}

function CreateAssetsPage({ selectedBranchId, onCreateComplete, onAssetCreated }: CreateAssetPageProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de Redux
    const errorAssets = useSelector((state: RootState) => state.assets.errorAssets);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IAssets>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
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
            const assetData = {
                ...values,
                conditionAssets: selectedCondition,
                branchId: selectedBranchId || values.branchId, // Usa el branchId pasado como prop si está disponible
            } as IAssets;

            await dispatch(postAsset(assetData, token));
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
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus equipos, herramientas o máquinas</h1>

                        <Link to='/inventories/consult-assets' className={styles.link__Income_Create}>Consulta tu inventario</Link>
                        <div className="d-flex">
                            <button className={`${styles.button__Detail} m-auto border-0 rounded text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus activos de forma masiva</button>
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

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {errorAssets?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>Selecciona una Sede</p>
                                </div>
                                <div>
                                    <select
                                        {...register('branchId', { required: true })}
                                        className={`${styles.info} p-2 border rounded border-secundary form-control`}
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
                                        <p className='text-danger'>La Sede es requerida</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el nombre del equipo, herramienta o maquinaría que vas a registrar? Ej: Computador, Guadaña, torno</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('nameItem', { required: true })}
                                        className={`${styles.info} p-2 border rounded border-secundary form-control`}
                                        placeholder='Nombre de tu equipo, herramienta o maquinaría que quieres registrar'
                                        onChange={handleNameItem}
                                    />
                                    {errors.nameItem && (
                                        <p className='text-danger'>El nombre del {nameItem} es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`} >Hoy siendo la primer vez que registras información, ¿Cuántos activos de este tipo tienes en el inventario?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.info} p-2 border rounded border-secundary form-control`}
                                        placeholder='Tu inventario acá'
                                        min={0}
                                    />
                                    {errors.inventory && (
                                        <p className='text-danger'>El inventario es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la marca de tu activo "{nameItem}"? Ej: Lenovo, Steel, Siemens</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('brandAssets', { required: true })}
                                        className={`${styles.info} p-2 border rounded border-secundary form-control`}
                                        placeholder='Marca equipo, herramienta o maquinaría quieres registrar'
                                    />
                                    {errors.brandAssets && (
                                        <p className='text-danger'>La marca del equipo, herramienta o máquina es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la referencia de tu activo "{nameItem}"? Escribe la referencia de tu máquina tal y como la vas a identificar en tu inventario. Ej: IdeaPad 1 Intel Core i5</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('referenceAssets', { required: true })}
                                        className={`${styles.info} p-2 border rounded border-secundary form-control`}
                                        placeholder='Referencia o N/A'
                                    />
                                    {errors.referenceAssets && (
                                        <p className='text-danger'>La referencia del equipo, herramienta o máquina es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} `}>¿Tu activo "{nameItem}" lo(la) compraste nuevo(a) o usado(a)?</p>
                                </div>
                                <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.conditionOption} ${selectedCondition === 'Nuevo' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleConditionChange('Nuevo')}
                                    >
                                        Nuevo
                                    </div>
                                    <div
                                        className={`${styles.conditionOption} ${selectedCondition === 'Usado' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleConditionChange('Usado')}
                                    >
                                        Usado
                                    </div>
                                    {errors.conditionAssets && (
                                        <p className='text-danger'>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div>
                                    <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el estado del(de la) {nameItem}?</p>
                                </div>
                                <div>
                                    <select
                                        {...register('stateAssets', { required: true })}
                                        className={`${styles.info} p-2 border rounded border-secundary form-control`}
                                    >
                                        <option value=''>Seleccione una opción</option>
                                        <option value='Funciona correctamente'>Funciona correctamente</option>
                                        <option value='Funciona requiere mantenimiento'>Funciona bien pero requiere pronto mantenimiento</option>
                                        <option value='Dañada requiere cambio'>Dañada y requiere cambio</option>
                                        <option value='Dañada requiere reparacion'>Dañada y requiere reparación</option>
                                    </select>
                                    {errors.stateAssets && (
                                        <p className='text-danger'>El estado de la máquina es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                        </form>
                    </div>
                    {!onCreateComplete && <Footer />}
                </div>
            </div>
        </div>
    );
}

export default CreateAssetsPage;