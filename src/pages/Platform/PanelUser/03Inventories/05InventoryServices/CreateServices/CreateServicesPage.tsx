/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAssets, getAssetsByBranch } from '../../../../../../redux/User/assetsSlice/actions';
import { getProducts, getProductsByBranch } from '../../../../../../redux/User/productSlice/actions';
import { getRawMaterials, getRawMaterialsByBranch } from '../../../../../../redux/User/rawMaterialSlice/actions';
import { postService, getServices } from '../../../../../../redux/User/serviceSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../../types/User/services.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import CreateManyServices from '../../../../../../components/Platform/03Inventories/05Servicios/CreateManyServices/CreateManyServices';
import CreateAsset from '../../../../../../components/Platform/03Inventories/CreateComponents/01CreateAssets';
import CreateProduct from '../../../../../../components/Platform/03Inventories/CreateComponents/02CreateProduct';
import CreateRawMateral from '../../../../../../components/Platform/03Inventories/CreateComponents/03CreateRawMaterial';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import styles from './styles.module.css';

function CreateServicesPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de Redux
    const errorService = useSelector((state: RootState) => state.service.errorService);
    const branches = useSelector((state: RootState) => state.branch.branch);
    const assets = useSelector((state: RootState) => state.assets.assets);
    const product = useSelector((state: RootState) => state.product.product);
    const rawMaterial = useSelector((state: RootState) => state.rawMaterial.rawMaterial);
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IService>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('');
    
    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getAssets(token));
        dispatch(getProducts(token));
        dispatch(getRawMaterials(token));
        if (selectedBranch) {
            dispatch(getAssetsByBranch(selectedBranch, token));
            dispatch(getProductsByBranch(selectedBranch, token));
            dispatch(getRawMaterialsByBranch(selectedBranch, token));
        }
    }, [ token, selectedBranch ]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseCreateManyModal = () => {
        setShowCancelModal(false);
    };

    //Selección de la sede
    const handleBranchChange = (e: any) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };


    

    //ACTIVOS
    const [isCreatingAsset, setIsCreatingAsset] = useState(false);
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [showCancelModalAsset, setShowCancelModalAsset] = useState(false);
    //RENDERIZA TODOS LOS ACTIVOS
    const renderAssetInputs = () => {
        // Si assets es null, devolvemos null
        if (!assets) return null;
    
        // Si assets es un solo objeto, lo convertimos en un array
        const assetsArray = Array.isArray(assets) ? assets : [assets];
    
        return assetsArray.map((asset, index) => (
            <div key={index} className='d-flex'>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center gap-2`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded`}>{asset.nameItem}</p>
                    <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={(e) => handleAssetCheckboxChange(asset.id, e.target.checked)}
                        className={`${styles.inputCheck} border rounded`}
                    />
                </div>
            </div>
        ));
    };

    // Selecciona todos los activos utilizados en la prestación del servicio
    const handleAssetCheckboxChange = (assetId: string, isChecked: boolean) => {
        setSelectedAssets((prevSelectedAssets) => {
            if (isChecked) {
                return [...prevSelectedAssets, assetId];
            } else {
                return prevSelectedAssets.filter((id) => id !== assetId);
            }
        });
    };

    const handleCreateAsset = () => {
        setShowCancelModalAsset(true);
        setIsCreatingAsset(true);
    };

    const onCloseAssetModal = () => {
        setShowCancelModalAsset(false);
        setIsCreatingAsset(false);
    };

    const onAssetCreated = (idBranch: string, token: string) => {
        dispatch(getAssetsByBranch(idBranch, token));
        setIsCreatingAsset(false);
    };



    //PRODUCTOS
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});
    const [showCancelModalProduct, setShowCancelModalProduct] = useState(false);
    //RENDERIZA TODOS LOS PRODUCTOS
    const renderProductInputs = () => {
        // Si product es null, devolvemos null
        if (!product) return null;
    
        // Si product es un solo objeto, lo convertimos en un array
        const productArray = Array.isArray(product) ? product : [product];
    
        return productArray.map((product, index) => (
            <div key={index} className='d-flex'>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center gap-2`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded`}>{product.nameItem}</p>
                    <input
                        type="checkbox"
                        className={`${styles.inputCheck} border rounded`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => handleProductCheckboxChange(product.id, e.target.checked)}
                    />
                    <input
                        type="number"
                        className={`${styles.renderInputQuantity} p-2 border rounded`}
                        value={productQuantities[product.id] || ''}
                        onChange={(e) => handleProductQuantityChange(product.id, parseInt(e.target.value, 10))}
                        placeholder={`Cantidad de ${product.nameItem}`}
                        min={0}
                    />
                </div>
            </div>
        ));
    };

    // Selecciona todos los productos utilizados en la prestación del servicio
    const handleProductCheckboxChange = (productId: string, isChecked: boolean) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (isChecked) {
                return [...prevSelectedProducts, productId];
            } else {
                return prevSelectedProducts.filter((id) => id !== productId);
            }
        });
    };

    // Modifica la función handleProductQuantityChange para manejar cambios en la cantidad de productos
    const handleProductQuantityChange = (productId: string, quantity: number) => {
        setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    //PRODUCTOS
    const handleCreateProduct = () => {
        setShowCancelModalProduct(true);
        setIsCreatingProduct(true);
    };

    const onCloseProductModal = () => {
        setShowCancelModalProduct(false);
        setIsCreatingProduct(false);
    };

    const onProductCreated = (idBranch: string, token: string) => {
        dispatch(getProductsByBranch(idBranch, token));
        setIsCreatingProduct(false);
    };



    
    //MATERIAS PRIMAS
    const [isCreatingRawMaterial, setIsCreatingRawMaterial] = useState(false);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<string[]>([]);
    const [rawMaterialQuantities, setRawMaterialQuantities] = useState<{ [key: string]: number }>({});
    const [showCancelModalRawMaterial, setShowCancelModalRawMaterial] = useState(false);
    //RENDERIZA TODAS LAS MATERIAS PRIMAS
    const renderRawMaterialInputs = () => {
        // Si assets es null, devolvemos null
        if (!rawMaterial) return null;
    
        // Si rawMaterial es un solo objeto, lo convertimos en un array
        const rawMaterialArray = Array.isArray(rawMaterial) ? rawMaterial : [rawMaterial];
    
        return rawMaterialArray.map((rawMaterial, index) => (
            <div key={index} className='d-flex'>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center gap-2`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded`}>{rawMaterial.nameItem}</p>
                    <input
                        type="checkbox"
                        className={`${styles.inputCheck} border rounded`}
                        checked={selectedRawMaterials.includes(rawMaterial.id)}
                        onChange={(e) => handleRawMaterialCheckboxChange(rawMaterial.id, e.target.checked)}
                    />
                    <input
                        type="number"
                        className={`${styles.renderInputQuantity} p-2 border rounded`}
                        value={rawMaterialQuantities[rawMaterial.id] || ''}
                        onChange={(e) => handleRawMaterialQuantityChange(rawMaterial.id, parseInt(e.target.value, 10))}
                        placeholder={`Cantidad de ${rawMaterial.nameItem}`}
                        min={0}
                        />
                    <p className={`${styles.renderInputUnitMeasure} m-0 p-1 d-flex`}>{rawMaterial.unitMeasure}s</p>
                </div>
            </div>
        ));
    };

    // Selecciona todas las materias primas utilizados en la prestación del servicio
    const handleRawMaterialCheckboxChange = (rawMaterialId: string, isChecked: boolean) => {
        setSelectedRawMaterials((prevSelectedRawMaterials) => {
            if (isChecked) {
                return [...prevSelectedRawMaterials, rawMaterialId];
            } else {
                return prevSelectedRawMaterials.filter((id) => id !== rawMaterialId);
            }
        });
    };

    const handleRawMaterialQuantityChange = (rawMaterialId: string, quantity: number) => {
        setRawMaterialQuantities((prevQuantities) => ({
            ...prevQuantities,
            [ rawMaterialId ]: quantity,
        }));
    };

    const handleCreateRawMaterial = () => {
        setIsCreatingRawMaterial(true);
        setShowCancelModalRawMaterial(true);
    };

    const onCloseRawMaterialModal = () => {
        setIsCreatingRawMaterial(false);
        setShowCancelModalRawMaterial(false);
    };

    const onRawMaterialCreated = (idBranch: string, token: string) => {
        setIsCreatingRawMaterial(false);
        dispatch(getRawMaterialsByBranch(idBranch, token));
    };



    const onSubmit = (values: IService) => {
        try {
            if (!isCreatingRawMaterial && !isCreatingProduct && !isCreatingAsset) {
                // Convertir assets, product y rawMaterial a arrays si no lo son ya
                const assetsArray = Array.isArray(assets) ? assets : assets ? [assets] : [];
                const productsArray = Array.isArray(product) ? product : product ? [product] : [];
                const rawMaterialsArray = Array.isArray(rawMaterial) ? rawMaterial : rawMaterial ? [rawMaterial] : [];
    
                const formDarta: IService = {
                    ...values,
                    serviceAssets: assetsArray
                        .filter((asset) => selectedAssets.includes(asset.id))
                        .map((asset) => ({
                            nameItem: asset.nameItem,
                            assetId: asset.id,
                        })),
    
                    serviceProducts: productsArray
                        .filter((product) => selectedProducts.includes(product.id))
                        .map((product) => ({
                            nameItem: product.nameItem,
                            productId: product.id,  // Usar 'productId' en lugar de 'productlId'
                            quantity: String(productQuantities[product.id] || 0),  // Convertir cantidad a cadena
                        })),
    
                    serviceRawMaterials: rawMaterialsArray
                        .filter((rawMaterial) => selectedRawMaterials.includes(rawMaterial.id))
                        .map((rawMaterial) => ({
                            nameItem: rawMaterial.nameItem,
                            rawMaterialId: rawMaterial.id,
                            unitMeasure: rawMaterial.unitMeasure,
                            quantity: String(rawMaterialQuantities[rawMaterial.id] || 0),  // Convertir cantidad a cadena
                        })),
                };
                dispatch(postService(formDarta, token));
                setFormSubmitted(true);
                dispatch(getServices(token));
                reset();
                setTimeout(() => {
                    setFormSubmitted(false);
                    setShouldNavigate(true);
                }, 1500);
            }
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-services');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Servicios</h1>

                        <Link to='/inventories/consult-services' className={styles.link__Income_Create}>Consulta tu inventario</Link>
                        
                        <div className="d-flex">
                            <button className={`${styles.button__Detail} m-auto border-0 rounded text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus servicios de forma masiva</button>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus servicios de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyServices
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseCreateManyModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorService)&& errorService?.map((error, i) => (
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
                                        onChange={handleBranchChange}
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
                                <div className="px-3">
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el nombre del servicio que vas a registrar?</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        {...register('nameItem', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Nombre del servicio que quieres crear'
                                    />
                                    {errors.nameItem && (
                                        <p className='text-danger'>El nombre del servicio es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div className="px-3">
                                    <p className={`${styles.text} mb-0 p-2`} >¿A qué precio vendes tu servicio?</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        {...register('sellingPrice', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='¿A qué precio vendes tu servicio? '
                                    />
                                    {errors.sellingPrice && (
                                        <p className='text-danger'>El precio del servicio es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <div className="px-3">
                                    <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el IVA del servicio?</p>
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

                            {selectedBranch && (
                                <div className={` mb-3 p-3 border border-secundary rounded`}>
                                    <div>
                                    <h3 className={`${styles.subtitleSection} text-center`}>Activos</h3>
                                        <p>Selecciona los equipos, herramientas o máquinas que implementas para prestar tu servicio</p>
                                        <p className='mt-2'>Si el equipo, herramienta o máquina no existe, créala <span className={`${styles.link} text-sky-500`} onClick={handleCreateAsset}>aquí</span></p>
                                        <Modal show={showCancelModalAsset} onHide={() => setShowCancelModalAsset(false)} size="xl">
                                            <Modal.Header closeButton onClick={() => setShowCancelModalAsset(false)}>
                                                <Modal.Title>Crear Activo</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CreateAsset
                                                    token={token}
                                                    selectedBranchId={selectedBranch}
                                                    onCreateComplete={() => {
                                                        onCloseAssetModal();
                                                        getAssetsByBranch(selectedBranch, token);
                                                    }}
                                                    onAssetCreated={onAssetCreated}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div>{renderAssetInputs()}</div>
                                </div>
                            )}

                            {selectedBranch && (
                                <div className={` mb-3 p-3 border border-secundary rounded`}>
                                    <div>
                                        <h3 className={`${styles.subtitleSection} text-center`}>Productos</h3>
                                        <p>Selecciona los productos que implementas para prestar tu servicio</p>
                                        <p className='mt-2'>Si el producto no existe, créalo <span className={`${styles.link} text-sky-500`} onClick={handleCreateProduct}>aquí</span></p>
                                        <Modal show={showCancelModalProduct} onHide={() => setShowCancelModalProduct(false)} size="xl">
                                            <Modal.Header closeButton onClick={() => setShowCancelModalProduct(false)}>
                                                <Modal.Title>Crear Producto</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CreateProduct
                                                    token={token}
                                                    selectedBranchId={selectedBranch}
                                                    onCreateComplete={() => {
                                                        onCloseProductModal();
                                                        getProductsByBranch(selectedBranch, token);
                                                    }}
                                                    onProductCreated={onProductCreated}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div>{renderProductInputs()}</div>
                                </div>
                            )}

                            {selectedBranch && (
                                <div className={` mb-3 p-3 border border-secundary rounded`}>
                                    <div>
                                        <h3 className={`${styles.subtitleSection} text-center`}>Materias Primas</h3>
                                        <p>Selecciona las Materias Primas que implementas para prestar tu servicio</p>
                                        <p className='mt-2'>Si la materia prima no existe, créala <span className={`${styles.link} text-sky-500`} onClick={handleCreateRawMaterial}>aquí</span></p>
                                        <Modal show={showCancelModalRawMaterial} onHide={() => setShowCancelModalRawMaterial(false)} size="xl">
                                            <Modal.Header closeButton onClick={() => setShowCancelModalRawMaterial(false)}>
                                                <Modal.Title>Crear Materia Prima</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CreateRawMateral
                                                    token={token}
                                                    selectedBranchId={selectedBranch}
                                                    onCreateComplete={() => {
                                                        onCloseRawMaterialModal();
                                                        getRawMaterialsByBranch(selectedBranch, token);
                                                    }}
                                                    onRawMaterialCreated={onRawMaterialCreated}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div>{renderRawMaterialInputs()}</div>
                                </div>
                            )}

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

export default CreateServicesPage;