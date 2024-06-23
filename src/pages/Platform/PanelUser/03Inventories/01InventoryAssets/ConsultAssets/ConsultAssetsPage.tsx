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
import ConsultAssetOff from '../../../../../../components/Platform/03Inventories/Assets/01ConsultAssetOff/ConsultAssetOff';
import SeeItemAsset from '../../../../../../components/Platform/03Inventories/Assets/02SeeItemAsset/SeeItemAsset';
import ConfirmDeleteRegister from '../../../../../../components/Platform/03Inventories/ConfirmDeleteRegister';
import ModalEditAsset from '../../../../../../components/Platform/03Inventories/Assets/04ModalEditAsset/ModalEditAsset';
import AddInventoryAsset from '../../../../../../components/Platform/03Inventories/Assets/0504AddInventoryAsset/AddInventoryAsset';
import ModalAssetOff from '../../../../../../components/Platform/03Inventories/Assets/06ModalAssetOff/ModalAssetOff';
import { formatNumber } from '../../../../../../helpers/FormatNumber/FormatNumber';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
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
    const [selectedItem, setSelectedItem] = useState<IAssets>();
    const [showSeeItem, setShowSeeItem] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditAssetModal, setShowIEditAssetModal] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultOff, setShowConsultOff] = useState(false);
    const [showAddInventory, setShowAddInventory] = useState(false);

    const handleConsultOff = useCallback(() => {
        setShowConsultOff(true);
    }, []);

    const handleSeeItem = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowSeeItem(true);
    }, []);

    const handleDelete = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowIEditAssetModal(true);
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
        setShowSeeItem(false);
        setShowDeleteConfirmation(false);
        setShowIEditAssetModal(false);
        setShowAddInventory(false);
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
                                    onClick={handleConsultOff}
                                >
                                    Dados de baja
                                </div>
                            </div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-assets' className={`${styles.link} text-decoration-none`}>Registro de equipos, herramientas y máquinas</Link>
                            </div>
                        </div>

                        <Modal show={showConsultOff} onHide={() => setShowConsultOff(false)} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalle de los equipos dados de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultAssetOff
                                    token={token}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Filter_Branch} mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tus equipos, herramientas y máquinas por sede</h3>
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
                                    <div className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</div>
                                    <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>Código de barras</div>
                                    <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>Nombre del item</div>
                                    <div className={`${styles.brand__Assets} d-flex align-items-center justify-content-center text-center`}>Marca</div>
                                    <div className={`${styles.reference__Asset} d-flex align-items-center justify-content-center text-center`}>Referencia</div>
                                    <div className={`${styles.state__Asset} d-flex align-items-center justify-content-center text-center`}>Estado</div>
                                    <div className={`${styles.condition__Asset} d-flex align-items-center justify-content-center text-center`}>Inventario</div>
                                    <div className={`${styles.condition__Asset} d-flex align-items-center justify-content-center text-center`}>Precio de compra</div>
                                    <div className={`${styles.condition__Asset} d-flex align-items-center justify-content-center text-center`}>IVA</div>
                                    <div className={`${styles.condition__Asset} d-flex align-items-center justify-content-center text-center`}>Precio de venta</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
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
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.barCode ? asset.barCode : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.nameItem}</span>
                                            </div>
                                            <div className={`${styles.brand__Assets} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.brandItem}</span>
                                            </div>
                                            <div className={`${styles.reference__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.referenceAssets}</span>
                                            </div>
                                            <div className={`${styles.state__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.stateAssets}</span>
                                            </div>
                                            <div className={`${styles.condition__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.inventory}</span>
                                            </div>
                                            <div className={`${styles.condition__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(asset.purchasePriceBeforeTax)}</span>
                                            </div>
                                            <div className={`${styles.condition__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.IVA} %</span>
                                            </div>
                                            <div className={`${styles.condition__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.sellingPrice ? formatNumber(asset.sellingPrice) : 'No definido'}</span>
                                            </div>
                                            <div className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdAsset(asset.id);
                                                            setNameAsset(asset.nameItem || '');
                                                            handleSeeItem(asset);
                                                        }}
                                                    />
                                                </div>
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

                        <Modal show={showSeeItem} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Activo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <SeeItemAsset
                                        asset={selectedItem}
                                        branches={branchesArray}
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

                        <Modal show={showEditAssetModal} onHide={onCloseModal} size="xl">
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Activo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalEditAsset
                                        token={token}
                                        idItem={idAsset}
                                        asset={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
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
                                    token={token}
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