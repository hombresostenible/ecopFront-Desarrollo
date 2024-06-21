/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAssets, getAssetsByBranch } from '../../../../../../redux/User/assetsSlice/actions';
import { getBranches } from '../../../../../../redux/User/branchSlice/actions';
import type { RootState, AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../../types/User/assets.types';
import { IBranch } from '../../../../../../types/User/branch.types';
import NavBar from '../../../../../../components/Platform/NavBar/NavBar';
import SideBar from '../../../../../../components/Platform/SideBar/SideBar';
import Footer from '../../../../../../components/Platform/Footer/Footer';
import ModalAsset from '../../../../../../components/Platform/03Inventories/Assets/ModalAsset/ModalAsset';
import ModalAssetOff from '../../../../../../components/Platform/03Inventories/Assets/ModalAssetOff/ModalAssetOff';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import ConsultAssetOff from '../../../../../../components/Platform/03Inventories/Assets/ConsultAssetOff/ConsultAssetOff';
import AddInventoryAsset from '../../../../../../components/Platform/03Inventories/Assets/AddInventoryAsset/AddInventoryAsset';
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ConsultAssetsPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const assets = useSelector((state: RootState) => state.assets.assets);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getAssets(token));
        }
    }, [token]);
    
    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getAssetsByBranch(selectedBranch, token));
            } else {
                // Si no se selecciona ninguna sede, obtén todos los activos
                dispatch(getAssets(token));
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [idAsset, setIdAsset] = useState('');
    const [idBranch, setIdBranch] = useState('');
    const [nameAsset, setNameAsset] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IAssets>();
    const [showItemModal, setShowItemModal] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultAssetOff, setShowConsultAssetOff] = useState(false);
    const [showAddInventory, setShowAddInventory] = useState(false);

    const handleConsultAssetOff = useCallback(() => {
        setShowConsultAssetOff(true);
    }, []);

    // const assetsWithInventoryOff = Array.isArray(assets) ? assets.filter(asset => asset.inventoryOff) : [];

    const handleDelete = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowItemModal(true);
    }, []);

    const handleAddInventory = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowAddInventory(true);
    }, []);

    const handleOff = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowOff(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowAddInventory(false);
        setShowDeleteConfirmation(false);
        setShowItemModal(false);
        setShowOff(false);
    }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Equipos, herramientas y máquinas</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex">
                                <div
                                    className={styles.link__Head_Navigate}
                                    onClick={handleConsultAssetOff}
                                >
                                    Visualiza tus equipos, herramientas y máquinas dados de baja
                                </div>
                            </div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-assets' className={`${styles.link} text-decoration-none`}>Registro de inventario</Link>
                            </div>
                        </div>

                        {/* <div>Filtrar por sede</div>
                        <div>descargar en PDF</div>
                        <div>Descargar en Excel</div>
                        <div>Bloquear las unidades enviadas en una cotzación</div>
                        <div>Visualizar activos dados de baja</div>
                        <div>Crear un filtro para cada columna</div> */}

                        <Modal show={showConsultAssetOff} onHide={() => setShowConsultAssetOff(false)} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de los equipos dados de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultAssetOff
                                    token={token}
                                    // assets={assetsWithInventoryOff}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Filter_Branch} mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tus activos por sede</h3>
                            <select
                                value={selectedBranch || ''}
                                className="mx-2 p-2 border rounded"
                                onChange={(e) => setSelectedBranch(e.target.value)}
                            >
                                <option value=''>Todas</option>
                                {branchesArray.map((branch: IBranch, index: number) => (
                                    <option key={index} value={branch.id}>
                                        {branch.nameBranch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>Sede</div>
                                    <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>Nombre del item</div>
                                    <div className={`${styles.brand__Assets} d-flex align-items-center justify-content-center`}>Marca</div>
                                    <div className={`${styles.reference__Asset} d-flex align-items-center justify-content-center`}>Referencia</div>
                                    <div className={`${styles.condition__Asset} d-flex align-items-center justify-content-center`}>Inventario</div>
                                    <div className={`${styles.state__Asset} d-flex align-items-center justify-content-center`}>Estado</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body}`}>
                                {Array.isArray(assets) && assets.length > 0 ? (
                                    assets.map((asset) => (
                                        <div key={asset.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                                        asset.branchId === branch.id && (
                                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                        )
                                                    ))}
                                                </span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.nameItem}</span>
                                            </div>
                                            <div className={`${styles.brand__Assets} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.brandAssets}</span>
                                            </div>
                                            <div className={`${styles.reference__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.referenceAssets}</span>
                                            </div>
                                            <div className={`${styles.condition__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.inventory}</span>
                                            </div>
                                            <div className={`${styles.state__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.stateAssets}</span>
                                            </div>
                                            <div className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <RiDeleteBin6Line
                                                        className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdAsset(asset.id);
                                                            setNameAsset(asset.nameItem || '');
                                                            handleDelete(asset);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdAsset(asset.id);
                                                            handleEdit(asset)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <FaPlus
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdAsset(asset.id);
                                                            setNameAsset(asset.nameItem || '');
                                                            setIdBranch(asset.branchId);
                                                            handleAddInventory(asset)
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <IoIosCloseCircleOutline
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdAsset(asset.id);
                                                            setNameAsset(asset.nameItem || '');
                                                            handleOff(asset)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`${styles.noAssetsMessage} d-flex align-items-center justify-content-center`}>
                                        No tienes equipos, herramientas y máquinas registrados
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal show={showItemModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Activo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalAsset
                                        token={token}
                                        idItem={idAsset}
                                        asset={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el activo "{nameAsset}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'Asset'}
                                    idItem={idAsset}
                                    nameRegister={nameAsset}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showAddInventory} onHide={() => setShowAddInventory(false)} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Aumenta tu inventario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddInventoryAsset
                                    token={token}
                                    idItem={idAsset}
                                    nameItem={nameAsset}
                                    idBranch={idBranch}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja a tu activo "{nameAsset}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalAssetOff
                                    asset={selectedItem as IAssets}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultAssetsPage;