/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postProduct, getProducts } from '../../../../../../redux/User/productSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import { getAssetsByBranch } from '../../../../../../redux/User/assetsSlice/actions';
import { getRawMaterialsByBranch } from '../../../../../../redux/User/rawMaterialSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../../types/User/products.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import CreateManyProduct from '../../../../../../components/Platform/03Inventories/03Products/CreateManyProducts/CreateManyProduct';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import CreateAsset from '../../../../../../components/Platform/03Inventories/CreateComponents/01CreateAssets';
import CreateRawMateral from '../../../../../../components/Platform/03Inventories/CreateComponents/03CreateRawMaterial';
import { GoPlus } from "react-icons/go";
import styles from './styles.module.css';

interface CreateProductPageProps {
    selectedBranchId: string;
    onCreateComplete?: () => void;
    onProductCreated?: (idBranch: string, token: string) => void;
}

function CreateProductsPage({ selectedBranchId, onCreateComplete, onProductCreated }: CreateProductPageProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de Redux
    const errorProduct = useSelector((state: RootState) => state.product.errorProduct);
    const branches = useSelector((state: RootState) => state.branch.branch);
    const assets = useSelector((state: RootState) => state.assets.assets);
    const rawMaterial = useSelector((state: RootState) => state.rawMaterial.rawMaterial);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IProduct>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            if (selectedBranchId) {
                getRawMaterialsByBranch(selectedBranchId, token);
                getAssetsByBranch(selectedBranchId, token);
            }
        }
    }, [token, selectedBranchId]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseProductModal = () => {
        setShowCancelModal(false);
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
    
    //Setea si el producto está empacada
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

    //Setea el valor 'Si' o 'No' en la propiedad "individualPackaging"
    const [selectedIndividualPackaging, setSelectedIndividualPackaging] = useState('Si');
    const handleIndividualPackagingChange = (value: 'Si' | 'No') => {
        setSelectedIndividualPackaging(value);
        setValue('individualPackaging', value);
    };



    //ACCESORISO DEL PRODUCTO
    const [accessoriesProduct, setAccessoriesProduct] = useState<{ accesory: string; productAccesoryPackageType: string }[]>([]);
    const [checkboxState, setCheckboxState] = useState<boolean[]>([]);

    //Setea el valor 'Si' o 'No' si el producto incluye accesorios
    const [selectedProductAccesory, setSelectedProductAccesory] = useState('Si');
    const handleShowAccesory = (value: SetStateAction<string>) => {
        setSelectedProductAccesory(value);
    };

    //Permite adicionar los accesorios
    const [newAccessory, setNewAccessory] = useState<string>('');
    const handleAddAccessory = () => {
        if (newAccessory.trim() !== '') {
            setAccessoriesProduct([...accessoriesProduct, { accesory: newAccessory, productAccesoryPackageType: '' }]);
            setNewAccessory('');
        }
    };
    
    //ACCESORIOS
    const handleCheckboxAccesoryChange = (index: number, checked: boolean) => {
        setCheckboxState((prev) => {
            const newState = [...prev];
            newState[index] = checked;
            return newState;
        });

        setAccessoriesProduct((prev) => {
            const updatedAccessories = [...prev];
            updatedAccessories[index] = {
                ...updatedAccessories[index],
                productAccesoryPackageType: checked ? '' : '',
            };
            return updatedAccessories;
        });        
    };

    const handleAccesoryPackageTypeChange = (index: number, value: string) => {
        setAccessoriesProduct((prev) => {
            const updatedAccessories = [...prev];
            updatedAccessories[index] = {
                ...updatedAccessories[index],
                productAccesoryPackageType: value,
            };
            return updatedAccessories;
        });
    };


    
    //ACTIVOS
    const [isCreatingAsset, setIsCreatingAsset] = useState(false);
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [showCancelModalAsset, setShowCancelModalAsset] = useState(false);

    //RENDERIZA LOS ACTIVOS
    const renderAssetInputs = () => {
        return Array.isArray(assets)&& assets.map((asset, index) => (
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
    
    // Selecciona todos los activos utilizados en la elaboración del producto
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

    const onAssetCreated = (selectedBranchId: string, token: string) => {
        getAssetsByBranch(selectedBranchId, token);
        setIsCreatingAsset(false);
    };




    //MATERIAS PRIMAS
    const [isCreatingRawMaterial, setIsCreatingRawMaterial] = useState(false);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<string[]>([]);
    const [rawMaterialQuantities, setRawMaterialQuantities] = useState<{ [key: string]: number }>({});
    const [ShowCancelModalRawMaterial, setShowCancelModalRawMaterial] = useState(false);
    //RENDERIZA TODAS LAS MATERIAS PRIMAS
    const renderRawMaterialInputs = () => {
        return Array.isArray(rawMaterial) && rawMaterial.map((rawMaterial, index) => (
            <div key={index}>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded text-start`}>{rawMaterial.nameItem}</p>
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
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                e.preventDefault();
                            }
                        }}
                    />
                    <p className={`${styles.renderInputUnitMeasure} m-0 p-1 d-flex`}>{rawMaterial.unitMeasure}s</p>
                </div>
            </div>
        ));
    };

    // Selecciona todas las materias primas para elaborar el producto
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
        setShowCancelModalRawMaterial(true);
        setIsCreatingRawMaterial(true);
    };

    const onCloseRawMaterialModal = () => {
        setShowCancelModalRawMaterial(false);
        setIsCreatingRawMaterial(false);
    };

    const onRawMaterialCreated = (selectedBranchId: string, token: string) => {
        getAssetsByBranch(selectedBranchId, token);
        setIsCreatingRawMaterial(false);
    };


    const onSubmit = async (values: IProduct) => {
        try {
            if (!isCreatingRawMaterial && !isCreatingAsset) {
                // Convertir assets, product y rawMaterial a arrays si no lo son ya
                const assetsArray = Array.isArray(assets) ? assets : assets ? [assets] : [];
                const rawMaterialsArray = Array.isArray(rawMaterial) ? rawMaterial : rawMaterial ? [rawMaterial] : [];
    
                if (values.inventoryIncrease === 'No') values.periodicityAutomaticIncrease = undefined;
                if (values.packaged === 'No') values.primaryPackageType = undefined;
    
                const formData = {
                    ...values,
                    returnablePackaging: selectedReturnablePackaging,
                    individualPackaging: selectedIndividualPackaging,
                    packaged: selectedpackaged,
                    inventoryIncrease: inventoryIncrease,
                    periodicityAutomaticIncrease: periodicityAutomaticIncrease,
    
                    productAccesory: selectedProductAccesory,
                    productAccesories: accessoriesProduct.map((accessory) => ({
                        accesory: accessory.accesory,
                        productAccesoryPackageType: accessory.productAccesoryPackageType || null,
                    })),
    
                    productAssets: assetsArray
                        .filter((asset) => selectedAssets.includes(asset.id))
                        .map((asset) => ({
                            nameAssets: asset.nameItem,
                            assetId: asset.id,
                        })),
    
                    productRawMaterials: rawMaterialsArray
                        .filter((rawMaterial) => selectedRawMaterials.includes(rawMaterial.id))
                        .map((rawMaterial) => ({
                            nameItem: rawMaterial.nameItem,
                            rawMaterialId: rawMaterial.id,
                            unitMeasure: rawMaterial.unitMeasure,
                            quantity: String(rawMaterialQuantities[rawMaterial.id] || 0),  // Convertir cantidad a cadena
                        })),
                } as IProduct;

                await dispatch(postProduct(formData, token));
                setFormSubmitted(true);
                reset();
                setTimeout(() => {
                    dispatch(getProducts(token));
                    setFormSubmitted(false);
                    if (onCreateComplete) {
                        onCreateComplete();
                    } else {
                        setShouldNavigate(true);
                    }
                    if (onProductCreated && selectedBranchId) {
                        onProductCreated(selectedBranchId, token);
                    }
                }, 1500);
            }
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-products');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Productos</h1>

                        <Link to='/inventories/consult-products' className={styles.link__Income_Create}>Consulta tu inventario</Link>

                        <div className="d-flex">
                            <button className={`${styles.button__Detail} m-auto border-0 rounded text-decoration-none`} onClick={() => { setShowCancelModal(true) }} >Crea tus productos de forma masiva</button>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus productos de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyProduct
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseProductModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorProduct) && errorProduct?.map((error, i) => (
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
                                        placeholder='Código de barras del producto que quieres registrar'
                                    />
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el nombre del producto que vas a registrar?</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('nameItem', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Nombre del producto que quieres crear'
                                    />
                                    {errors.nameItem && (
                                        <p className='text-danger'>El nombre del producto es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la marca o referencia del producto que vas a registrar?</p>
                                <div>
                                    <input
                                        type="text"
                                        {...register('brandItem')}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Marca del producto quieres registrar'
                                    />
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿En qué unidad de medida desear registrar el inventario de tu producto?</p>
                                <div>
                                    <select
                                        {...register('unitMeasure', { required: true })}
                                        className={`${styles.input} p-2 border `}
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
                                            <option value='Paquete'>Paquete</option>
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
                                        <p className='text-danger'>El tipo de empaque de tu producto es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >Hoy siendo la primer vez que registras información, ¿Cuánto producto tienes en el inventario?</p>
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
                                        <p className='text-danger'>El inventario del producto es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿El producto viene empacada en embalaje o envoltura?</p>
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
                                    <p className={`${styles.text} mb-0 p-2`} >Si el producto viene empacado ¿Cuál es el tipo de empaque principal?</p>
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
                                            <p className='text-danger'>El tipo de empaque de tu producto es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿El producto tiene empaques adicionales?</p>
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
                                    <p className={`${styles.text} mb-0 p-2`} >Si el producto tiene empaques adicionales ¿Cuál es el tipo de empaque?</p>
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
                                            <p className='text-danger'>El tipo de empaque de tu producto es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {selectedpackaged === 'Si' && (
                                <div>
                                    {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <p className={`${styles.text} `} >¿Cuánt{['Unidades', 'Onza', 'Pimpina', 'Libra', 'Arroba', 'Tonelada'].includes(showUnitMeasure) ? 'as' : 'os'} {showUnitMeasure}{['Unidades'].includes(showUnitMeasure) ? '' : 's'} de "{nameItem}" vienen por cada empaque o paquete?</p>
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

                                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                        <p className={`${styles.text} `} >¿El empaque, embalaje o envoltura de tu producto es retornable?</p>
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
                                        <p className={`${styles.text} mb-0 p-2`} >Inventario: A futuro, ¿Cuánto deseas que se sume "{periodicityAutomaticIncrease}" a tu inventario?</p>
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
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de venta?</p>
                                <div>
                                    <input
                                        type="number"
                                        {...register('sellingPrice', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Precio de venta del producto'
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


                            {/* RETENCIONES */}
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >Si está grabado ¿Cuál es el tipo de retención?</p>
                                <div>
                                    <select
                                        {...register('retentionType', { required: true })}
                                        className={`${styles.input} p-2 border `}                                    
                                    >
                                        <option value='No tiene'>No tiene</option>
                                        <option value='Retefuente'>Retefuente</option>
                                        <option value='Rete IVA'>Rete IVA</option>                                                
                                        <option value='Rete ICA'>Rete ICA</option>
                                    </select>
                                    {errors.retentionType && (
                                        <p className='text-danger'>El tipo de retención es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención de honorarios y consultoría?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentageFeesConsulting', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='2'>2</option>
                                        <option value='4'>4</option>
                                        <option value='6'>6</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                    </select>
                                    {errors.retentionPercentageFeesConsulting && (
                                        <p className='text-danger'>El porcentaje de retención de honorarios y consultoría es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención de servicios?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentageServices', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3.5'>3.5</option>
                                        <option value='4'>4</option>
                                        <option value='6'>6</option>
                                    </select>
                                    {errors.retentionPercentageServices && (
                                        <p className='text-danger'>El porcentaje de retención de servicios es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención de compras?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentagePurchases', { required: true })}
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
                                    {errors.retentionPercentagePurchases && (
                                        <p className='text-danger'>El porcentaje de retención de compras es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención de otros?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentageOthers', { required: true })}
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
                                    {errors.retentionPercentageOthers && (
                                        <p className='text-danger'>El porcentaje de retención de otros es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención por pagos al exterior y dividendos?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentageForeignPaymentsDividends', { required: true })}
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
                                    {errors.retentionPercentageForeignPaymentsDividends && (
                                        <p className='text-danger'>El porcentaje de retención por pagos al exterior y dividendos es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención por IVA?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentageIVA', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='15'>15</option>
                                        <option value='100'>100</option>
                                    </select>
                                    {errors.retentionPercentageIVA && (
                                        <p className='text-danger'>El porcentaje de retención por IVA es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de retención por ICA?</p>
                                <div>
                                    <select
                                        {...register('retentionPercentageICA', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='2'>2</option>
                                        <option value='3.4'>3.4</option>
                                        <option value='4.14'>4.14</option>
                                        <option value='5'>5</option>
                                        <option value='6.9'>6.9</option>
                                        <option value='8'>8</option>
                                        <option value='9.66'>9.66</option>
                                        <option value='11.04'>11.04</option>
                                        <option value='13.8'>13.8</option>
                                    </select>
                                    {errors.retentionPercentageICA && (
                                        <p className='text-danger'>El porcentaje de retención por ICA es requerido</p>
                                    )}
                                </div>
                            </div>


                            {/* IMPUESTOS */}
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de IVA del producto?</p>
                                <div className={styles.containerInput}>
                                    <select
                                        defaultValue={0}
                                        className={`${styles.input} p-2 border `}
                                        {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                                    >
                                        <option value={0}>0 %</option>
                                        <option value={5}>5 %</option>
                                        <option value={19}>19 %</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de ICA del producto?</p>
                                <div>
                                    <select
                                        {...register('consumptionTax', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='4'>4</option>
                                        <option value='8'>8</option>
                                        <option value='16'>16</option>
                                    </select>
                                    {errors.consumptionTax && (
                                        <p className='text-danger'>El porcentaje de ICA es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de AIU del producto?</p>
                                <div>
                                    <select
                                        {...register('ivaAiu', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='0'>0</option>
                                        <option value='1'>1</option>
                                    </select>
                                    {errors.ivaAiu && (
                                        <p className='text-danger'>El porcentaje de AIU es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el valor del impuesto a las bebidas azucaradas?</p>
                                <div>
                                    <input
                                        type="number"
                                        {...register('taxesUltraProcessedSugarSweetenedBeverages', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Valor del impuesto a las bebidas azucaradas'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.taxesUltraProcessedSugarSweetenedBeverages && (
                                        <p className='text-danger'>El valor del impuesto a las bebidas azucaradas es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de impuesto sobre el valor añadido a las bebidas azucaradas ultraprocesadas?</p>
                                <div>
                                    <select
                                        {...register('valueTaxesUltraProcessedSugarSweetenedBeverages', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='0'>0</option>
                                        <option value='18'>18</option>
                                        <option value='28'>28</option>
                                        <option value='35'>35</option>
                                        <option value='38'>38</option>
                                        <option value='55'>55</option>
                                        <option value='65'>65</option>
                                    </select>
                                    {errors.valueTaxesUltraProcessedSugarSweetenedBeverages && (
                                        <p className='text-danger'>El porcentaje de de impuesto sobre el valor añadido a las bebidas azucaradas ultraprocesadas es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el porcentaje de impuestos a productos alimentarios ultraprocesados?</p>
                                <div>
                                    <select
                                        {...register('taxesUltraProcessedFoodProducts', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                    >
                                        <option value='10'>10</option>
                                        <option value='15'>15</option>
                                        <option value='20'>20</option>
                                    </select>
                                    {errors.taxesUltraProcessedFoodProducts && (
                                        <p className='text-danger'>El porcentaje de impuestos a productos alimentarios ultraprocesados es requerido</p>
                                    )}
                                </div>
                            </div>


                            {/* ACCESORIOS */}
                            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >¿Tu producto incluye accesorios?</p>
                                <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.conditionOption} ${selectedProductAccesory === 'Si' ? styles.selected : ''} m-1 p-2 text-center`} 
                                        onClick={() => handleShowAccesory('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.conditionOption} ${selectedProductAccesory === 'No' ? styles.selected : ''} m-1 p-2 text-center`} 
                                        onClick={() => handleShowAccesory('No')}
                                    >
                                        No
                                    </div>
                                    {errors.returnablePackaging && (
                                        <p className='text-danger'>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {selectedProductAccesory === 'Si' && (
                                <div className={` mb-3 p-3 border border-secundary rounded`}>
                                    <h3 className={`${styles.subtitleSection} text-center`}>Accesorios</h3>
                                    <p className='mt-2'>Ingresa aquí los accesorios de tu producto</p>
                                    <div className={`m-3 d-flex align-items-center justify-content-center gap-3`}>
                                        <input
                                            type="text"
                                            className={`${styles.info} p-2 border rounded border-secundary`}
                                            value={newAccessory}
                                            onChange={(e) => setNewAccessory(e.target.value)}
                                        />
                                        <div className={`${styles.containerIconAdd} d-flex align-items-center justify-content-center`}>
                                            <GoPlus className={`${styles.iconAdd} m-0`} onClick={handleAddAccessory}/>
                                        </div>
                                    </div>
                                    <div className={`${styles.containerAccesories} m-auto d-flex flex-column align-items-center justify-content-between`}>
                                        <p>Si el accesorio contiene algún tipo de empaque, presiona el check y selecciona un tipo de las opciones</p>
                                        {accessoriesProduct.map((accessory, index) => (
                                            <div key={index} className={`${styles.accesories} d-flex flex-column`}>
                                                <div className="m-auto p-2 d-flex" >
                                                    <p className={`${styles.accesory} p-2 text-start border rounded`}>{accessory.accesory}</p>
                                                    <input
                                                        type="checkbox"
                                                        className={styles.inputCheck}
                                                        onChange={(e) => handleCheckboxAccesoryChange(index, e.target.checked)}
                                                    />
                                                    {checkboxState[index] && (
                                                        <div>
                                                            <select
                                                                {...register(`productAccesories.${index}.productAccesoryPackageType`, { required: true })}
                                                                value={accessory.productAccesoryPackageType || ''}
                                                                onChange={(e) => handleAccesoryPackageTypeChange(index, e.target.value)}
                                                                className={`${styles.accesorySelect} border rounded`}
                                                            >
                                                                <option value=''>Selecciona una opción</option>
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
                                                            {errors.productAccesories && (
                                                                <p className='text-danger'>El tipo de empaque de tu accesorio es requerido</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}



                            {/* ACTIVOS */}
                            {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                                <p className={`${styles.text} mb-0 p-2`} >Para elaborar tu producto ¿Utilizas equipos, herramientas o máquinas?</p>
                                <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center border rounded`}>
                                    <div
                                        className={`${styles.conditionOption} ${selectedProductAsset === 'Si' ? styles.selected : ''} m-1 p-2 text-center`} 
                                        onClick={() => handleShowAsset('Si')}
                                        >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.conditionOption} ${selectedProductAsset === 'No' ? styles.selected : ''} m-1 p-2 text-center`} 
                                        onClick={() => handleShowAsset('No')}
                                    >
                                        No
                                    </div>
                                    {errors.returnablePackaging && (
                                        <p className='text-danger'>Este dato es requerido</p>
                                    )}
                                </div>
                            </div> */}

                            <div className={` mb-3 p-3 border border-secundary rounded`}>
                                <div>
                                    <h3 className={`${styles.subtitleSection} text-center`}>Equipos, herramientas o máquinas</h3>
                                    <p>Selecciona los equipos, herramientas o máquinas que utilizas para elaborar tu producto</p>
                                    <p className='mt-2'>Si el equipo, herramienta o máquina no existe, créalo <span className={`${styles.link} text-sky-500 text-decoration-none`} onClick={handleCreateAsset}>aquí</span></p>
                                    <Modal show={showCancelModalAsset} onHide={() => setShowCancelModalAsset(false)} size="xl">
                                        <Modal.Header closeButton onClick={() => setShowCancelModalAsset(false)}>
                                            <Modal.Title>Crear Activo</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <CreateAsset
                                            token={token}
                                            selectedBranchId={selectedBranchId}
                                            onCreateComplete={() => {
                                                onCloseAssetModal();
                                                getRawMaterialsByBranch(selectedBranchId, token);
                                            }}
                                            onAssetCreated={onAssetCreated}
                                        />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div>{renderAssetInputs()}</div>
                            </div>
                            {/* {selectedProductAsset === 'Si' && (
                            )} */}



                            {/* MATERIAS PRIMAS */}
                            <div className={` mb-3 p-3 border border-secundary rounded`}>
                                <div>
                                    <h3 className={`${styles.subtitleSection} text-center`}>Materias primas</h3>
                                    <p>Selecciona las materias primas y especifica la cantidad que utilizas para elaborar un (1) producto:</p>
                                    <Modal show={ShowCancelModalRawMaterial} onHide={() => setShowCancelModalRawMaterial(false)} size="xl">
                                        <Modal.Header closeButton onClick={() => setShowCancelModalRawMaterial(false)}>
                                            <Modal.Title>Crear Materia Prima</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <CreateRawMateral
                                                token={token}
                                                selectedBranchId={selectedBranchId}
                                                onCreateComplete={() => {
                                                    onCloseRawMaterialModal();
                                                    getRawMaterialsByBranch(selectedBranchId, token);
                                                }}
                                                onRawMaterialCreated={onRawMaterialCreated}
                                            />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div>{renderRawMaterialInputs()}</div>
                                <p className='mt-2'>Si la materia prima no existe, créala <span className={`${styles.link} text-sky-500`} onClick={handleCreateRawMaterial}>aquí</span></p>
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

export default CreateProductsPage;